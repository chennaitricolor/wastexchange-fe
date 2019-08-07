import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AppService } from 'app/app.service';

@Component({
  selector: 'wm-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnDestroy {
  public page: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public appServ: AppService) {
    this.appServ.hidePageActions = true;
    this.activatedRoute.params.subscribe((params: ParamMap) => {
      this.page = params['page'];
    });
  }

  ngOnDestroy() {
    this.appServ.hidePageActions = false;
  }
}
