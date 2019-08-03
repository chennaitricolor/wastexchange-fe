import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'app/app.service';
import { MATERIALS } from 'app/app.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'wm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() sellers: any[] = [];
  public materials = MATERIALS;
  public environment = environment;

  lat: number = 13.135108;
  long: number = 80.255417;
  zoom: number = 12;

  constructor(public appServ: AppService) {}

  ngOnInit() {}

  public onMarkerClick(index) {
    !this.sellers[index].details &&
      this.appServ.isUserLoggedIn &&
      this.appServ.getSellerItems(this.sellers[index].id).subscribe(response => {
        this.sellers[index].canBidBeRaisedAgainst = !!Object.keys(response.details).length;
        this.sellers[index].details = this.appServ.setDefaultMaterialData(response || { details: {} }).details;
      });
  }
}
