import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar *ngIf="showNavbar"></app-navbar>
    <div class="content" [ngClass]="{ 'with-navbar': showNavbar }">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .content {
        padding: 1rem;
      }
      .content.with-navbar {
        padding-top: 70px; /* Adjust based on your navbar height */
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular-standalone-app';
  showNavbar = false;
  activeTab = 'apartments';

  constructor(private router: Router, private authService: AuthService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const path = event.urlAfterRedirects;
        this.showNavbar = !(
          path.includes('/login') || path.includes('/register')
        );

        if (
          !this.authService.isLoggedIn() &&
          !path.includes('/login') &&
          !path.includes('/register')
        ) {
          this.router.navigate(['/login']);
        }
      });
  }
}
