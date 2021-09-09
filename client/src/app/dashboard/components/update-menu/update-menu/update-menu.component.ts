
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute , Params, Router } from '@angular/router';
import { Menu } from 'src/app/core/models/menu';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})

export class UpdateMenuComponent implements OnInit {

  titleField: FormControl;
  descriptionField: FormControl;
  priceField: FormControl;
  imageUrlField: FormControl;
  plato: Menu;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService : MenuService,
    private notifaciones: NotificacionesService
  ) {

    this.titleField = new FormControl('', [Validators.required, Validators.minLength(10)])
    this.descriptionField = new FormControl('', [Validators.required, Validators.minLength(20)])
    this.priceField = new FormControl('', [Validators.required, Validators.minLength(1)])
    this.imageUrlField = new FormControl('', [Validators.required])

  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {

      const id = params.id || null
      this.menuService.getPlato(id)
        .subscribe((plato : Menu )=> {

          this.titleField.setValue(plato.title);
          this.descriptionField.setValue(plato.description);
          this.priceField.setValue(plato.price);
          this.imageUrlField.setValue(plato.urlimage);
          this.plato = plato;

        });

      });

  }


  editarPlato(){

    this.plato.title = this.titleField.value;
    this.plato.description=this.descriptionField.value;
    this.plato.price = this.priceField.value;
    this.plato.urlimage = this.imageUrlField.value;
    this.menuService.actualizarPlato(this.plato.id, this.plato).subscribe((plato: any) => {
      this.notifaciones.notificacionExitosa(
        `El plato ${plato.title} fue actualizado de forma exitosa `);
    });
  }

}
