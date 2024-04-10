import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoByIdResponse } from '../models/YouTubeVideo';
import { YoutubeVideoComponent } from '../components/youtube-video/youtube-video.component';
import { YouTubeSearchResponse } from '../models/YouTubeResponse';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  baseApiUrl = 'http://localhost:5000/api'
  // baseApiUrl = 'https://lvhackathon-2024.onrender.com/api'

  constructor(private http: HttpClient) { }

  getItems(){
    const items = JSON.parse(localStorage.getItem('xplain-items') as string)
    return items
  }

  handleItems(action: 'add' | 'delete', item: any){
    let items = this.getItems()

    if(action === 'add'){
      const newItem = { id: Date.now(), ...item }; 
      items.push(newItem); 
    } else if(action === 'delete'){
      items = items.filter((i: any) => i.id !== item.id);
    }
    localStorage.setItem('xplain-items', JSON.stringify(items));
  }

  getTranscriptionAndSummary(id: any, additionalPrompt?: string) {
    let url = `${this.baseApiUrl}/get-captions/${id}`;
    if (additionalPrompt) {
      url += `/${additionalPrompt}`;
    }
    return this.http.get(url);
  }

  searchAll(query: string, nextPageToken?: string): Observable<YouTubeSearchResponse> {
    let apiUrl = `${this.baseApiUrl}/search-videos?search_query=${query}`;
    if (nextPageToken) {
      apiUrl += `&next_page_token=${nextPageToken}`;
    }

    return this.http.get<YouTubeSearchResponse>(apiUrl);
  }
  
  getVideo(videoId: string) : Observable<VideoByIdResponse> {
    return this.http.get<VideoByIdResponse>(`${this.baseApiUrl}/videos?videoId=${videoId}`)
  }
  
}
