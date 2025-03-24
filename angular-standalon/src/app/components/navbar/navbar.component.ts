// navbar.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  link: string;
  active: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  scrolled = false;

  // Menü öğelerinizi burada tanımlayın
  menuItems: MenuItem[] = [
    { label: 'Home', link: '/', active: true },
    { label: 'Flat List', link: '/flat-list', active: false },
    { label: 'Flat Form', link: '/flat-form', active: false },
    { label: 'Posts', link: '/posts', active: false },
  ];

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 30;
  }

  setActive(index: number) {
    this.menuItems.forEach((item, i) => {
      item.active = i === index;
    });
  }
}
