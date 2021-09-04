
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../core/services/auth/authentication/authentication.service';

@Directive({
  selector: '[hasRoles]'
})
export class HasRolesDirective {

  @Input() roles: Array<string>;

  constructor(
    private element: ElementRef,
    private authService: AuthenticationService
  ) {

  }

  ngOnInit() {

    let element = this.element.nativeElement;

    if( !this.authService.hasRoles(this.roles) ) {
      element.remove(); }

  }

}
