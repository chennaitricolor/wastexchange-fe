import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  Input
} from "@angular/core";
import { DomPortalHost, PortalHost, CdkPortal } from "@angular/cdk/portal";
import { TemplatePortal } from "@angular/cdk/portal";
import { AppService } from 'app/app.service';

const PRIMARY_COLORS = {
  admin: '#e16262',
  seller: '#eb5821',
  buyer: '#08b5ae'
};

const SECONDARY_COLORS = {
  admin: '#efd7d7',
  seller: '#ffd6c7',
  buyer: '#a1ebeb'
};

@Component({
  selector: 'wm-page-actions',
  templateUrl: './page-actions.component.html',
  styleUrls: ['./page-actions.component.scss']
})
export class PageActionsComponent implements OnInit, AfterViewInit, OnDestroy {
  private portalHost: PortalHost;
  public primaryColors = PRIMARY_COLORS;
  public secondaryColors = SECONDARY_COLORS;

  @Input() user: any;
  @ViewChild(CdkPortal) portal;
  @ViewChild('pageActions') pageActionsTmplRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef,
    public appServ: AppService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    // Create a portalHost from a DOM element
    this.portalHost = new DomPortalHost(
      document.querySelector('#page-actions-container'),
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    // Locate the component factory for the HeaderComponent
    this.portal = new TemplatePortal(this.pageActionsTmplRef, this.viewContainerRef);

    // Attach portal to host
    this.portalHost.attach(this.portal);
  }

  ngOnDestroy(): void {
    this.portalHost.detach();
  }
}
