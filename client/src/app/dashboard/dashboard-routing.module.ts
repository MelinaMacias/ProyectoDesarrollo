
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
import { ActualizarPersonalComponent } from './components/personal/actualizar-personal/actualizar-personal.component';
import { CrearPersonalComponent } from './components/personal/crear-personal/crear-personal.component';
import { PersonalComponent } from './components/personal/personal/personal.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { UpdateMenuComponent } from './components/update-menu/update-menu/update-menu.component';
import { UpdateNoticiaComponent } from './components/update-noticia/update-noticia/update-noticia.component';
import { UpdateReservaComponent } from './components/update-reserva/update-reserva.component';
import { IsAdminGuard } from './guards/auth/is-admin/is-admin.guard';
import { IsStaffGuard } from './guards/auth/is-staff/is-staff.guard';

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
        path: "personal",
        component: PersonalComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "personal/crear",
        component: CrearPersonalComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "personal/:id",
        component: ActualizarPersonalComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "menus",
        component: MenuComponent,
        canActivate: [IsStaffGuard]
      },
      {
        path: "menus/crear",
        component: CreateMenuComponent,
        canActivate: [IsStaffGuard]
      },
      {
        path: "menus/:id",
        component: UpdateMenuComponent,
        canActivate: [IsStaffGuard]
      },
      {
        path: "noticias",
        component: NoticiaComponent,
        canActivate: [IsStaffGuard]
      },
      {
        path: "noticias/crear",
        component: CreateNoticiaComponent,
        canActivate: [IsStaffGuard]
      },
      {
        path: "noticias/:id",
        component: UpdateNoticiaComponent,
        canActivate: [IsStaffGuard]
      },
      {
        path: "mensajes-contacto",
        component: MensajesContactoComponent,
        canActivate: [IsStaffGuard]
      },
      {
        path: "mensajes-contacto/:id",
        component: MensajeRespuestaComponent,
        canActivate: [IsStaffGuard]
      },
      {
        path: "reservas",
        component: ReservasComponent
      },
      {
        path: "reservas/crear",
        component: ReservacionesComponent
      },
      {
        path: "reservas/:id",
        component: UpdateReservaComponent
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
