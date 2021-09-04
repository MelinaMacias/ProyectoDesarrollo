
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HasRolesDirective } from './directives/authorization/hasRoles/has-roles.directive';
import { IsAuthenticatedDirective } from './directives/authorization/isAuthenticated/is-authenticated.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    IsAuthenticatedDirective,
    HasRolesDirective,

  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    IsAuthenticatedDirective,
    NavbarComponent,
    HasRolesDirective
  ]
})
export class SharedModule { }
