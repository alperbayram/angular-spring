import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PostsComponent {
  posts: any[] = [];

  constructor(private http: HttpClient) {
    http
      .get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((response: any) => {
        console.log(response);
        this.posts = response;
      });
  }
}
