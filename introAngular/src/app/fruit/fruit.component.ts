import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FruitService } from './fruit.service';

@Component({
  selector: 'app-fruit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fruit-container">
      <select
        class="fruit-dropdown"
        #fruitSelect
        (change)="onFruitSelect(fruitSelect.value)"
      >
        <option value="">Select</option>
        <option *ngFor="let fruit of fruits" [value]="fruit">
          {{ fruit }}
        </option>
      </select>

      <div *ngIf="selectedFruit" class="selected-fruit">
        <p>
          Fruit: <strong>{{ selectedFruit }}</strong>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .fruit-dropdown {
        padding: 8px;
        font-size: 16px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 200px;
      }
      select:focus {
        outline: none;
        border-color: #007bff;
      }
      .selected-fruit {
        margin-top: 20px;
        padding: 10px;
        background-color: #f8f9fa;
        border-radius: 4px;
      }
    `,
  ],
})
export class FruitComponent implements OnInit {
  fruits: string[] = [];
  selectedFruit: string = '';

  constructor(private fruitService: FruitService) {}

  ngOnInit() {
    this.fruits = this.fruitService.getFruits();
  }

  onFruitSelect(value: string) {
    this.selectedFruit = value;
    console.log('Seçilen meyve:', this.selectedFruit);
  }
}
