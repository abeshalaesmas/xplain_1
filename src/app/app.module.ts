import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from './layout/app.layout.module';
import { AppRoutingModule } from './app-routing.module';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { SkeletonModule } from 'primeng/skeleton';
import { ToolbarModule } from 'primeng/toolbar';
import { MessagesModule } from 'primeng/messages';
import { HttpClientModule } from '@angular/common/http';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { DirectLinkComponent } from './pages/direct-link/direct-link.component';
import { SummarizedItemComponent } from './components/summarized-item/summarized-item.component';
import { TimeAgoPipe } from './utils/time-ago.pipe';
import { YoutubeVideoComponent } from './components/youtube-video/youtube-video.component';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchComponent,
    DirectLinkComponent,
    SummarizedItemComponent,
    TimeAgoPipe,
    YoutubeVideoComponent,
    VideoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    AppLayoutModule,
    CardModule,
    TooltipModule,
    InputTextModule,
    TabViewModule,
    SkeletonModule,
    ToolbarModule,
    MessagesModule,
    HttpClientModule,
    InputTextareaModule,
    PanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    MenuModule,
    TagModule,
    DynamicDialogModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
