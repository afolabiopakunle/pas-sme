import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth-services/auth.service';
import { Injectable, Injector } from '@angular/core';




@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(public injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();
    const tenant = authService.getTenant();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
          Tenant: `${tenant}`,
        },
      });

    }
    return next.handle(req);
  }
}
