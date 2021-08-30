
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/components/page404/page404.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./landing/landing.module")
      .then( m => m.LandingModule)
  },
  {
    path: "dashboard",
    loadChildren: () => import("./dashboard/dashboard.module")
      .then( m => m.DashboardModule)
  },
  {
    path: "**",
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
