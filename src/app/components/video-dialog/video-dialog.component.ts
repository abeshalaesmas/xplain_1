import { Component } from '@angular/core';
import {  DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Video } from '../../models/YouTubeVideo';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Base } from '../../base/Base';
import { WebService } from '../../services/web.service';
import { FileService } from '../../utils/file.service';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.css'
})
export class VideoDialogComponent extends Base {
  videoData!: Video;
  safeVideoUrl!: SafeResourceUrl;
  videoUrl!: string;
  
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private sanitizer: DomSanitizer,
    protected override webService: WebService, 
    protected override fileService: FileService 
  ) {
    super(webService, fileService);
  }

  ngOnInit() {
    this.videoData = this.config.data.video;
    this.videoUrl = `https://www.youtube.com/watch?v=${this.videoData.id}`

    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoData.id}`
    )
  }

  
}
