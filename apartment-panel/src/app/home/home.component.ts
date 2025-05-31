import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  announcements = [
    { date: 'May 31', message: 'Water interruption between 10AM-2PM.' },
    { date: 'May 30', message: 'Pest control in stairwells.' },
    { date: 'May 29', message: 'Monthly general meeting at 6PM.' },
    { date: 'May 28', message: 'Elevator maintenance on June 2.' },
    { date: 'May 27', message: 'Electricity inspection on 3rd floor.' },
    { date: 'May 26', message: 'Fire drill scheduled for June 5.' },
  ];

  payments = [
    { type: 'Maintenance Fee', amount: 500 },
    { type: 'Elevator Contribution', amount: 120 },
    { type: 'Water Bill', amount: 80 },
    { type: 'Electricity Shared Cost', amount: 140 },
    { type: 'Security Fee', amount: 100 },
  ];

  maintenanceRequests = [
    { detail: 'Leaky faucet in Apt 4B', reported: 'May 28' },
    { detail: 'Garage light flickering', reported: 'May 30' },
    { detail: 'Broken mailbox door Apt 2A', reported: 'May 25' },
    { detail: 'Paint peeling in stairwell', reported: 'May 26' },
    { detail: 'Main entrance buzzer not working', reported: 'May 24' },
    { detail: 'Intercom noise issue Apt 5C', reported: 'May 22' },
  ];

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }

    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  get totalPayment(): number {
    return this.payments.reduce((sum, p) => sum + p.amount, 0);
  }
}
