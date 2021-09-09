
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsStaffGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService:AuthenticationService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if(this.authService.hasRole("staff")) {
      return true; }

    this.router.navigate(['/dashboard/perfil']);
    return false;

  }

}
