
import {Component, Input, OnInit} from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import {Menu} from '../../models/menu';

@Component ({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() title:string;
  @Input() subtitle:string;
  @Input() footer:boolean = true;

  menus: Menu[]
  menuLeft: Menu[]
  menuRight: Menu[]

  constructor(
    private menuService:MenuService ) {

  }

  ngOnInit() {

    this.menuService.getAllPlates().subscribe( (menuList) => {

      this.menus = this.footer ? menuList.reverse() : menuList.slice(0, 6);
      let bound = Math.ceil(this.menus.length / 2);
      this.menuLeft = this.menus.slice(0, bound);
      this.menuRight = this.menus.slice(bound);

    });

    if( !this.title ) {

      this.title = "Menu completo";
      this.subtitle = "Deleitese con nuestra amplia variedad";

    }

  }

}
