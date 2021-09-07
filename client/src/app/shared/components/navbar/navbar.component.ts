
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth/authentication/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginUrl:string;
  is_auth: boolean;

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit(): void {

    this.loginUrl = environment.main_login;
    this.is_auth = this.authService.isAuthenticated();

  }

}
