import { Component } from '@angular/core';
import { PostsComponent } from './posts/posts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [PostsComponent],
  standalone: true,
  styles: [
    `
      .app-container {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      header {
        background-color: #3498db;
        color: white;
        padding: 1rem;
        text-align: center;
      }

      main {
        padding: 1rem;
      }

      footer {
        background-color: #f8f9fa;
        padding: 1rem;
        text-align: center;
        margin-top: 2rem;
        border-top: 1px solid #eee;
        color: #666;
      }
    `,
  ],
})
export class AppComponent {
  title = 'posts-app';
}
