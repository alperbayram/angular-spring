// flat-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlatService, FlatItem } from './flat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flat-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './flat-list.component.html',
  styleUrls: ['./flat-list.component.css'],
  providers: [FlatService],
})
export class FlatListComponent implements OnInit {
  flatItems: FlatItem[] = [];
  loading = true;
  error: string | null = null;

  constructor(private flatService: FlatService, private router: Router) {}

  ngOnInit(): void {
    this.loadFlats();
  }

  loadFlats(): void {
    this.flatService.getAllFlats().subscribe({
      next: (data) => {
        this.flatItems = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Veri yüklenirken bir hata oluştu.';
        this.loading = false;
        console.error('API hatası:', err);
      },
    });
  }

  navigateToDetail(id: string | number): void {
    this.router.navigate(['/flat/load', id]);
  }
}
