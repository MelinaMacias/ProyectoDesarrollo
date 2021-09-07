
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ContenedorDashboardComponent } from './components/contenedor-dashboard/contenedor-dashboard.component';
import { CreateMenuComponent } from './components/create-menu/create-menu/create-menu.component';
import { CreateNoticiaComponent } from './components/create-noticia/create-noticia/create-noticia.component';
import { GeneralComponent } from './components/general/general.component';
import { MensajeRespuestaComponent } from './components/mensaje-respuesta/mensaje-respuesta.component';
import { MensajesContactoComponent } from './components/mensajes-contacto/mensajes-contacto.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { UpdateMenuComponent } from './components/update-menu/update-menu/update-menu.component';
import { UpdateNoticiaComponent } from './components/update-noticia/update-noticia/update-noticia.component';
import { IsAdminGuard } from './guards/auth/is-admin/is-admin.guard';

const routes: Routes = [
  {
    path: "",
    component: ContenedorDashboardComponent,
    children: [
      {
        path: "",
        component: GeneralComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "menus",
        component: MenuComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "menus/crear",
        component: CreateMenuComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "menus/:id",
        component: UpdateMenuComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "noticias",
        component: NoticiaComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "noticias/crear",
        component: CreateNoticiaComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "noticias/:id",
        component: UpdateNoticiaComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "mensajes-contacto",
        component: MensajesContactoComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "mensajes-contacto/:id",
        component: MensajeRespuestaComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "reservaciones",
        component: ReservacionesComponent
      },
      {
        path: "perfil",
        component: PerfilComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
