import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerBrowseComponent } from './buyer-browse.component';

describe('BuyerBrowseComponent', () => {
  let component: BuyerBrowseComponent;
  let fixture: ComponentFixture<BuyerBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
