
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreacionClienteComponent } from './components/cliente/creacion-cliente/creacion-cliente.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DesarrolladoresComponent } from './components/desarrolladores/desarrolladores.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoticiaComponent } from './components/noticia/noticia.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "menu",
        component: MenuComponent
      },
      {
        path: "noticias",
        component: NoticiaComponent
      },
      {
        path: "desarrolladores",
        component: DesarrolladoresComponent
      },
      {
        path: "contacto",
        component: ContactoComponent
      },
      {
        path: "registro",
        component: CreacionClienteComponent

      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
