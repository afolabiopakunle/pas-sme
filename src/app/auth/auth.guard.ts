import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-services/auth.service';
import { ToasterService } from '../@core/toaster.service';
import { Injectable } from '@angular/core';




@Injectable({providedIn: 'root'})


export class AuthGuard implements CanActivate {
  constructor(public router: Router,
              public authService: AuthService,
              public toaster: ToasterService) {}

  canActivate(): boolean| Observable<boolean> | Promise<boolean> {
    const Auth = this.authService.getIsAuthenticated();
    if (!Auth) {
      // this.toaster.showToast('danger', 'Access Denied', 'Log in');
      this.router.navigate(['/auth', 'login']);
    }
    return Auth;
  }

}
