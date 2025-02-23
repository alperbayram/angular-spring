import { Component } from '@angular/core';
import { FruitComponent } from './fruit/fruit.component';

@Component({
  selector: 'app-root',
  imports: [FruitComponent],
  template: `
  <div>
    <h1>Fruit app</h1>
    <app-fruit></app-fruit>
  </div>
`
})
export class AppComponent {
  title = 'introAngular';
}
