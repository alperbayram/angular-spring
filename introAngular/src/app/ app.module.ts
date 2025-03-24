import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent, // PostsComponent burada olmalı
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // HttpClientModule burada olmalı
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
