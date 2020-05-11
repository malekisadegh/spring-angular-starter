import { Component, OnInit } from '@angular/core';
import { SideMenuService } from '@core/side-menu/side-menu.service';

interface IMenuItem {
  title: string;
  icon: string;
  link: string;
  home: boolean;
  children: [];
}

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  menuList: IMenuItem[] = [];

  constructor(private sideMenuService: SideMenuService) {}

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(): void {
    this.sideMenuService.getMenuData().subscribe((data: any[]) => {
      this.menuList = data;
    });
  }
}
