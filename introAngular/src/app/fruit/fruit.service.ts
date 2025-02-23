import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  private fruits: string[] = [
    'Banana',
    'Apple',
    'Straberries',
    'orange',
    'Lemon',
    'Pineapple',
  ];

  getFruits(): string[] {
    return this.fruits;
  }
}
