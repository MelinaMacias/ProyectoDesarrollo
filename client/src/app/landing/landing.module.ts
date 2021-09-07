
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DesarrolladoresComponent } from './components/desarrolladores/desarrolladores.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { MenuComponent } from './components/menu/menu.component';
import { LocationComponent } from './components/location/location.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactoComponent,
    DesarrolladoresComponent,
    NoticiaComponent,
    MenuComponent,
    LocationComponent,
    HomeComponent,
    LayoutComponent,

  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    LandingRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LandingModule { }
