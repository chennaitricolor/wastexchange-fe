import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidListTableComponent } from './bid-list-table.component';

describe('BidListTableComponent', () => {
  let component: BidListTableComponent;
  let fixture: ComponentFixture<BidListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
