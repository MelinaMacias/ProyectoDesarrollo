
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../core/services/auth/authentication/authentication.service';

@Directive({
  selector: '[isAuthenticated]'
})
export class IsAuthenticatedDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private authService: AuthenticationService
  ) { 

  }

  ngOnInit() {

    let element = this.element.nativeElement;

    if( !this.authService.isAuthenticated() ) {
      element.remove(); }

  }

}
