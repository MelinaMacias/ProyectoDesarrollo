
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Menu } from 'src/app/core/models/menu';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent  {

  titleField: FormControl;
  descriptionField: FormControl;
  priceField: FormControl;
  imageUrlField: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private menuService : MenuService,
    private notifaciones: NotificacionesService ) { 

    this.titleField = new FormControl('', [Validators.required, Validators.minLength(10)]);
    this.descriptionField = new FormControl('', [Validators.required, Validators.minLength(20)]);
    this.priceField = new FormControl('', [Validators.required, Validators.minLength(1)]);
    this.imageUrlField = new FormControl('', [Validators.required]);

  }

  nuevoPlato(){
  
    this.menuService.crearPlato({
      id: 0,
      title: this.titleField.value,
      description: this.descriptionField.value,
      price: this.priceField.value,
      urlimage: this.imageUrlField.value
    
    }).subscribe((plato: any) => {
      this.notifaciones.notificacionExitosa(
        `El plato ${plato.title} fue creado de forma exitosa `);
      this.router.navigate(["/dashboard/menus"])
    },
    (err) => this.notifaciones.notificacionErrores(err)
    );

  }

}
