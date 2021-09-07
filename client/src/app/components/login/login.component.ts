
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private nextPath : string;
  public usernameField: FormControl
  public passwordField: FormControl
  public loginError: boolean = false;

  constructor(
    public authService: AuthenticationService,
    private router: ActivatedRoute) {

      this.usernameField = new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]);

      this.passwordField = new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]);

  }

  ngOnInit(): void {

    this.router.queryParams.subscribe(
      (params:any) => this.nextPath = params.next );

  }

  authUser() {

    if( this.usernameField.valid && this.passwordField.valid ) {

      let authResult = this.authService.login({
        "username": this.usernameField.value,
        "password": this.passwordField.value
      }, this.nextPath || '/dashboard');

      authResult.catch(err => this.loginError = true);

    }

  }

}
