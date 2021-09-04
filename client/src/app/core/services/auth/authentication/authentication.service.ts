
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/models/usercredentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private httpOptions: any;

  constructor(
    private http: HttpClient,
    private router: Router ) {

    this.httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/json"})
    }

  }

  public login(user: UserCredentials, next: string) {

    return new Promise( (res, rej) => {

      this.http.post(
        `${environment.main_login}/login`, user, this.httpOptions)
        .subscribe(
          (token: any) => {

            this.setData(token.token);
            res("Login Success!");
            this.router.navigate([next]);

          },
          (error: any) => { rej(error.error); }

      );

    });

  }

  public logout() {

    localStorage.removeItem("exp");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    this.router.navigate(["/"]);

  }

  public isAuthenticated() {

    return localStorage.getItem("token") ? true : false;

  }

  private setData(token: string) {

    let payload = JSON.parse( window.atob(token.split('.')[1]) );
    localStorage.setItem("token", token);
    localStorage.setItem("exp", payload.exp);
    localStorage.setItem("roles", payload.roles ? payload.roles : []);

  }

  public hasRole(role: string) {

    let roles = localStorage.getItem("roles");

    return roles ? roles.split(",").includes(role) : false;

  }

  public hasRoles(roles: Array<string>) {

    let roleList: string[] = [];

    if( localStorage.getItem("roles") ) {
      roleList = localStorage.getItem("roles").split(","); }

    return roles.map( role => roleList.includes(role) ).reduce( (a, b) => a && b );

  }

}
