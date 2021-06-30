
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from 'src/components/contacto/contacto.component';
import { DesarrolladoresComponent } from 'src/components/desarrolladores/desarrolladores.component';
import { HomeComponent } from 'src/components/home/home.component';
import { Page404Component } from 'src/components/page404/page404.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "inicio",
    component: HomeComponent
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
    path: "**",
    component: Page404Component
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
