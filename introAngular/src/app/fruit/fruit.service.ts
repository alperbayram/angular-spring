import { Injectable } from '@angular/core';

export interface Item {
  id: number;
  name: string;
  description: string;
}

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
