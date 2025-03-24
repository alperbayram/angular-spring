import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FruitService } from './fruit.service';

@Component({
  selector: 'app-fruit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fruit.component.html',
  styleUrl: './fruit.component.css',
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
