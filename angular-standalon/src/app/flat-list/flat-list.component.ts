// flat-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlatService, FlatItem } from './flat.service';

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

  constructor(private flatService: FlatService) {}

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
}
