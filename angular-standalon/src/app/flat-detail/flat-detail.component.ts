import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlatService, FlatItem } from '../flat-list/flat.service';

@Component({
  selector: 'app-flat-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './flat-detail.component.html',
  styleUrls: ['./flat-detail.component.css'],
  providers: [FlatService],
})
export class FlatDetailComponent implements OnInit {
  flat: FlatItem | null = null;
  loading = true;
  error: string | null = null;
  showDeleteConfirm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  navigateToUpdate(id: string): void {
    this.router.navigate(['/flat/update', id]);
  }

  confirmDelete(id: string): void {
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  deleteFlat(id: string | number): void {
    if (this.flat && this.flat.id) {
      this.loading = true;
      this.flatService.deleteFlat(id.toString()).subscribe({
        next: () => {
          this.loading = false;
          this.showDeleteConfirm = false;
          this.router.navigate(['/flat-list']);
        },
        error: (err) => {
          this.error = 'Flat silinirken bir hata oluştu.';
          this.loading = false;
          this.showDeleteConfirm = false;
          console.error('Silme hatası:', err);
        },
      });
    }
  }

  goBack(): void {
    window.history.back();
  }
}
