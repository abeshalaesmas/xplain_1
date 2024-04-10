import { Component, HostListener, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { Video, YouTubeSearchResponse } from '../../models/YouTubeResponse';
import { Video as VideoById } from '../../models/YouTubeVideo';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { VideoDialogComponent } from '../../components/video-dialog/video-dialog.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  providers: [DialogService],
})
export class SearchComponent implements OnInit {
  searchValue!: string;
  fetchedVideoIds: string[] = []

  searching: boolean = false;
  loading: boolean = false;

  videos: Video[] = [];
  searchSuggestions: any[] = [];

  nextPageToken!: string;

  ref!: DynamicDialogRef;

  constructor(
    private webService: WebService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.loadMore();
    }
  }

  search() {
    this.searching = true;
    this.webService.searchAll(this.searchValue).subscribe({
      next: (res: YouTubeSearchResponse) => {
        console.log(res);
        this.videos = res.videos;
        this.nextPageToken = res.nextPageToken;
      },
      error: (err) => {
        console.log(err);
        this.searching = false;
      },
      complete: () => {
        this.searching = false;
        this.fetchedVideoIds = this.videos.map((video: Video) => video.id.videoId);
      },
    });
  }

  openDialog(video: VideoById) {
    const dialogConfig: DynamicDialogConfig = {
      header: `${video.snippet.title}`,
      data: {
        video,
      },
      width: '50vw',
      modal: true,
      closeOnEscape: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    };
    this.ref = this.dialogService.open(VideoDialogComponent, dialogConfig);
    console.log(video);
  }

  loadMore() {
    if (this.nextPageToken) {
      this.loading = true
      this.webService
        .searchAll(this.searchValue, this.nextPageToken)
        .subscribe({
          next: (res: YouTubeSearchResponse) => {
            const newVideos = res.videos.filter(video => !this.fetchedVideoIds.includes(video.id.videoId))
            this.nextPageToken = res.nextPageToken;
            this.videos.push(...newVideos)
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
            const newVideoIds = this.videos.map((video: Video) => video.id.videoId);
            this.fetchedVideoIds = this.fetchedVideoIds.concat(newVideoIds)
          },
        });
    }
  }
}
