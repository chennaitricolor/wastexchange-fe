import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerBidListComponent } from './buyer-bid-list.component';

describe('BuyerBidListComponent', () => {
  let component: BuyerBidListComponent;
  let fixture: ComponentFixture<BuyerBidListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerBidListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerBidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
