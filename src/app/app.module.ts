import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenreListComponent } from './genre-list/genre-list.component';
import { HeaderComponent } from './header/header.component';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ApiDataService } from './api-data.service';
// import { DemoService } from './demo.service';
import { HttpClientModule } from '@angular/common/http';

import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { ApiDataService } from './api-data.service';

@NgModule({
  declarations: [
    AppComponent,
    GenreListComponent,
    HeaderComponent,
    MoviePreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpErrorHandler,
    ApiDataService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
