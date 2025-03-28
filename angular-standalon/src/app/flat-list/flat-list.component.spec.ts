import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatListComponent } from './flat-list.component';

describe('FlatListComponent', () => {
  let component: FlatListComponent;
  let fixture: ComponentFixture<FlatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
