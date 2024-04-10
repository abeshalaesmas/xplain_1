import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../../models/YouTubeResponse';
import { WebService } from '../../services/web.service';
import { VideoByIdResponse } from '../../models/YouTubeVideo';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrl: './youtube-video.component.css',
})
export class YoutubeVideoComponent {
  @Input() video!: Video;
  @Output() dialog = new EventEmitter();
  constructor(private webService: WebService) {}

  openDialog(video: Video) {
    this.webService.getVideo(video.id.videoId).subscribe({
      next: (response: VideoByIdResponse) => {
        this.dialog.emit(response.video[0]);
      },
      error: (error) => {
        console.log(error);
      },
    })
    // this.dialog.emit({
    //   kind: 'youtube#video',
    //   etag: 'pN_srNIbWsdtZpn3KtJFJVx9aOw',
    //   id: 'M7uo5jmFDUw',
    //   snippet: {
    //     publishedAt: '2024-03-18T15:01:39Z',
    //     channelId: 'UCsBjURrPoezykLs9EqgamOA',
    //     title: 'Erlang in 100 Seconds',
    //     description:
    //       'Erlang is a functional programming language know for message-based concurrency model. Its BEAM virtual machine is still used by modern languages like Elixir and Gleam. Learn the basics of Erlang in this quick tutorial. \n\n#programming #computerscience #100secondsofcode \n\n💬 Chat with Me on Discord\n\nhttps://discord.gg/fireship\n\n🔗 Resources\n\nErlang https://www.erlang.org\nElixir in 100 Seconds https://youtu.be/R7t7zca8SyM\nC in 100 seconds https://youtu.be/U3aXWizDbQ4\n\n🔥 Get More Content - Upgrade to PRO\n\nUpgrade at https://fireship.io/pro\nUse code YT25 for 25% off PRO access \n\n🎨 My Editor Settings\n\n- Atom One Dark \n- vscode-icons\n- Fira Code Font\n\n🔖 Topics Covered\n\n- What is Erlang?\n- Who created Erlang/OTP?\n- Basics of Erlang\n- Elixir vs Erlang\n- Gleam vs Erlang\n- What is the BEAM vm?\n- How to get started with Erlang',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i.ytimg.com/vi/M7uo5jmFDUw/default.jpg',
    //         width: 120,
    //         height: 90,
    //       },
    //       medium: {
    //         url: 'https://i.ytimg.com/vi/M7uo5jmFDUw/mqdefault.jpg',
    //         width: 320,
    //         height: 180,
    //       },
    //       high: {
    //         url: 'https://i.ytimg.com/vi/M7uo5jmFDUw/hqdefault.jpg',
    //         width: 480,
    //         height: 360,
    //       },
    //       standard: {
    //         url: 'https://i.ytimg.com/vi/M7uo5jmFDUw/sddefault.jpg',
    //         width: 640,
    //         height: 480,
    //       },
    //       maxres: {
    //         url: 'https://i.ytimg.com/vi/M7uo5jmFDUw/maxresdefault.jpg',
    //         width: 1280,
    //         height: 720,
    //       },
    //     },
    //     channelTitle: 'Fireship',
    //     tags: ['webdev', 'app development', 'lesson', 'tutorial'],
    //     categoryId: '28',
    //     liveBroadcastContent: 'none',
    //     localized: {
    //       title: 'Erlang in 100 Seconds',
    //       description:
    //         'Erlang is a functional programming language know for message-based concurrency model. Its BEAM virtual machine is still used by modern languages like Elixir and Gleam. Learn the basics of Erlang in this quick tutorial. \n\n#programming #computerscience #100secondsofcode \n\n💬 Chat with Me on Discord\n\nhttps://discord.gg/fireship\n\n🔗 Resources\n\nErlang https://www.erlang.org\nElixir in 100 Seconds https://youtu.be/R7t7zca8SyM\nC in 100 seconds https://youtu.be/U3aXWizDbQ4\n\n🔥 Get More Content - Upgrade to PRO\n\nUpgrade at https://fireship.io/pro\nUse code YT25 for 25% off PRO access \n\n🎨 My Editor Settings\n\n- Atom One Dark \n- vscode-icons\n- Fira Code Font\n\n🔖 Topics Covered\n\n- What is Erlang?\n- Who created Erlang/OTP?\n- Basics of Erlang\n- Elixir vs Erlang\n- Gleam vs Erlang\n- What is the BEAM vm?\n- How to get started with Erlang',
    //     },
    //     defaultAudioLanguage: 'en',
    //   },
    //   contentDetails: {
    //     duration: 'PT2M44S',
    //     dimension: '2d',
    //     definition: 'hd',
    //     caption: 'false',
    //     licensedContent: true,
    //     contentRating: {},
    //     projection: 'rectangular',
    //   },
    //   statistics: {
    //     viewCount: '394073',
    //     likeCount: '21143',
    //     favoriteCount: '0',
    //     commentCount: '825',
    //   },
    // });
  }
}
