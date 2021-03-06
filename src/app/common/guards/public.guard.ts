import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(public _authService: AuthenticationService, public _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this._authService.isLoggedIn()) {
        return true;
      }
      console.log('Usuario Autenticado');
      this._router.navigate(['/home']);
      return false;
  }
}
