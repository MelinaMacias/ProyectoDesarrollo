import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth/authentication/authentication.service';

@Component({
  selector: 'app-contenedor-dashboard',
  templateUrl: './contenedor-dashboard.component.html',
  styleUrls: ['./contenedor-dashboard.component.css']
})
export class ContenedorDashboardComponent implements OnInit {

  constructor(
    private authService: AuthenticationService ) {

  }

  ngOnInit(): void {
  }

  logout() {

    this.authService.logout();

  }

}
