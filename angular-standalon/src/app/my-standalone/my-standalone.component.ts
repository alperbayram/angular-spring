import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-my-standalone',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './my-standalone.component.html',
  styleUrl: './my-standalone.component.css',
})
export class MyStandaloneComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.loading = true;
    this.error = null;

    this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe({
        next: (data) => {
          this.posts = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching posts:', err);
          this.error = 'Failed to load posts. Please try again later.';
          this.loading = false;
        },
      });
  }
}
