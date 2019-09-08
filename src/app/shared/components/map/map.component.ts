import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { AppService } from 'app/app.service';
import { MATERIALS } from 'app/app.model';
import { environment } from 'environments/environment';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'wm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @ViewChild('agmMap') public agmMap: AgmMap;
  @Input() sellers: any[] = [];
  public materials = MATERIALS;
  public environment = environment;

  lat: number = 13.135108;
  long: number = 80.255417;
  zoom: number = 12;

  constructor(public appServ: AppService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.agmMap.zoom = 12;
    // TO-DO: trigger resize is not working. cant able to reset zoom level. need to check why?!
    this.agmMap.triggerResize(true);
  }

  public onMarkerClick(index) {
    !this.sellers[index].details &&
      this.appServ.getSellerItems(this.sellers[index].id).subscribe(response => {
        this.sellers[index].canBidBeRaisedAgainst = !!Object.keys(response.details).length;
        this.sellers[index].details = this.appServ.setDefaultMaterialData(response || { details: {} }).details;
      });
  }
}
