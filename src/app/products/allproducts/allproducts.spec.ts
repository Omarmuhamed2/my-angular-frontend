import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allproducts } from './allproducts';

describe('Allproducts', () => {
  let component: Allproducts;
  let fixture: ComponentFixture<Allproducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Allproducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Allproducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
