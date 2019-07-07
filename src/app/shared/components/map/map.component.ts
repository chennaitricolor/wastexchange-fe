import { Component, OnInit } from '@angular/core';
import { Seller, SELLER_DATA } from "./../../../app.model";

@Component({
  selector: 'wm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public sellerData: Seller[] = SELLER_DATA;
  lat: number = 12.9801;
  lng: number = 80.218;
  zoom: number = 12;

  constructor() { }

  ngOnInit() {
  }

}
