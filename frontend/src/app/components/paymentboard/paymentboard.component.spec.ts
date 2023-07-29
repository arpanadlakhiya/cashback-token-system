import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentboardComponent } from './paymentboard.component';

describe('PaymentboardComponent', () => {
  let component: PaymentboardComponent;
  let fixture: ComponentFixture<PaymentboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
