/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { AuthService } from './auth/auth-services/auth.service';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  userIsAuthenticated = false;
  perm: any[] = [];
  API_URL: string = environment.baseAPIURL;
  key = localStorage.getItem('key');
  private authStatusListenerSub: Subscription;

  initContents() {
    this.authService.automaticAuthenticateUser();
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusListenerSub = this.authService.getAuthenticationStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

  }
  constructor(private analytics: AnalyticsService,
              private seoService: SeoService,
              private authService: AuthService,
              private menuService: NbMenuService,
              ) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.initContents();
  }

  startLogout() {

  }
}
