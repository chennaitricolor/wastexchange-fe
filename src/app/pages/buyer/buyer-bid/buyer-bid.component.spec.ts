import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerBidComponent } from './buyer-bid.component';

describe('BuyerBidComponent', () => {
  let component: BuyerBidComponent;
  let fixture: ComponentFixture<BuyerBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
