import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { NoticiaComponent } from '../components/noticia/noticia.component';
import { MenuComponent } from '../components/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactoComponent } from '../components/contacto/contacto.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { APP_BASE_HREF } from '@angular/common';
import { Page404Component } from '../components/page404/page404.component';
import { DesarrolladoresComponent } from '../components/desarrolladores/desarrolladores.component';

import {HttpClientModule} from '@angular/common/http';
import { LocationComponent } from '../components/location/location.component'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NoticiaComponent,
    MenuComponent,
    ContactoComponent,
    NavbarComponent,
    Page404Component,
    DesarrolladoresComponent,
    LocationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
