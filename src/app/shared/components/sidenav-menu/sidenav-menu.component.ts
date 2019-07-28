import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MENUMASTER } from './sidenav-menu.data';
import { Menu } from './sidenav-menu';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'wm-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)'))
    ])
  ]
})
export class SidenavMenuComponent implements OnInit {
  public menuMaster: Menu[] = MENUMASTER;
  @Output('close') private close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public router: Router) {}

  ngOnInit() {}

  /**
   * @description triggered upon selection of menu
   * @param menu the menu that is selected
   */
  public onMenuSelected(menu: Menu) {
    if (!menu.children || !menu.children.length) {
      this.router.navigate([menu.link]);
      this.close.emit(true);
    }
    if (menu.children && menu.children.length) {
      menu.expanded = !menu.expanded;
    }
  }
}
