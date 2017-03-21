import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSpendingComponent } from './product-spending.component';

describe('ProductSpendingComponent', () => {
  let component: ProductSpendingComponent;
  let fixture: ComponentFixture<ProductSpendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSpendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
