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

@Component({
  selector: "wm-page-actions",
  templateUrl: "./page-actions.component.html",
  styleUrls: ["./page-actions.component.scss"]
})
export class PageActionsComponent implements OnInit, AfterViewInit, OnDestroy {
  private portalHost: PortalHost;
  @Input() user:any;
  @ViewChild(CdkPortal) portal;
  @ViewChild("pageActions") pageActionsTmplRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    // Create a portalHost from a DOM element
    this.portalHost = new DomPortalHost(
      document.querySelector("#page-actions-container"),
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    // Locate the component factory for the HeaderComponent
    this.portal = new TemplatePortal(
      this.pageActionsTmplRef,
      this.viewContainerRef
    );

    // Attach portal to host
    this.portalHost.attach(this.portal);
  }
  
  ngOnDestroy(): void {
    this.portalHost.detach();
  }
}
