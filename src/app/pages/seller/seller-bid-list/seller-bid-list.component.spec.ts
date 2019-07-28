import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBidListComponent } from './seller-bid-list.component';

describe('SellerBidListComponent', () => {
  let component: SellerBidListComponent;
  let fixture: ComponentFixture<SellerBidListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SellerBidListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
