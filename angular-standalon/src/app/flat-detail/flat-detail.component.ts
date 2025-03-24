// flat-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlatService, FlatItem } from '../flat-list/flat.service';

@Component({
  selector: 'app-flat-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './flat-detail.component.html',
  providers: [FlatService],
})
export class FlatDetailComponent implements OnInit {
  flat: FlatItem | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private flatService: FlatService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadFlatDetail(id);
      } else {
        this.error = 'ID bulunamadı';
        this.loading = false;
      }
    });
  }

  loadFlatDetail(id: string): void {
    this.flatService.getFlatById(id).subscribe({
      next: (data) => {
        this.flat = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Flat detayları yüklenirken bir hata oluştu.';
        this.loading = false;
        console.error('API hatası:', err);
      },
    });
  }

  goBack(): void {
    window.history.back();
  }
}
