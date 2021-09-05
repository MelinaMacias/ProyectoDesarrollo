
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Menu } from 'src/app/core/models/menu';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { NotificacionesService } from '../../../shared/services/notificaciones/notificaciones.service'

@Component({
  selector: 'dashboard-menus',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  platos : Array<Menu> = [];

  constructor(private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private notifaciones: NotificacionesService) { }

  ngOnInit(): void {

    this.menuService.getAllPlates().subscribe( (platos: Array<Menu>) => {

      platos.forEach( (plato: any) => {
      
        this.platos.push(plato);
      
      });

      });

  }

  borrar(plato: Menu){
  
    this.menuService.borrarPlato(plato.id).subscribe( (plato: any) => {

      document.querySelector(`#plato-${plato.id}`).remove();
      this.notifaciones.notificacionExitosa(
        `El plato ${plato.title} fue borrado de forma exitosa `);
          
    });
  
  }

}
