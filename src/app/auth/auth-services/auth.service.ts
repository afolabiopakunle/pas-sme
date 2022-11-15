import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL: string = environment.baseAPIURL;
  key = localStorage.getItem('key');
  private token: string;
  tenant: string;
  user;
  business_key;
  business_name;
  business_type;
  email;
  authenticationStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  // for onboarding
  sectorD: any[] = [];
  businessType: any[] = [];
  currencyD: any;
  countryD: any[] = [];
  business: any;
  businessId: any;
  permissions: any[];
  dash: any;
  graph: any;

  constructor(
    private http: HttpClient,
    public router: Router,
  ) {}



  public get_dashboard_updated = new Subject<{dash: any, graph: any}>();
  public getSectorUpdated = new Subject<{ sectorD: any[] }>();
  public getBusinessTypeUpdated = new Subject<{ businessType: any[] }>();
  public getBusinessUpdated = new Subject<{ business: any }>();
  public getBusinessIdUpdated = new Subject<{ businessId: any }>();
  public getCurrencyUpdated = new Subject<{ currencyD: any }>();
  public getCountryUpdated = new Subject<{ countryD: any[] }>();

  getCountryUpdater = () => {
    return this.getCountryUpdated.asObservable();
  }

  get_dashboard_updater() {
    return this.get_dashboard_updated.asObservable();
  }

  getCountry = () => {
    this.http
      .get<any>(`${this.API_URL}organization/countries/`)
      .subscribe(data => {
        this.countryD = data;
        this.getCountryUpdated.next({
          countryD: [...this.countryD],
        });
      });
  }

  getCurrencyUpdater = () => {
    return this.getCurrencyUpdated.asObservable();
  }

  getCurrency = () => {
    this.http
      .get<any>(`${this.API_URL}organization/currencies/`)
      .subscribe(data => {
        this.currencyD = data;
        this.getCurrencyUpdated.next({
          currencyD: this.currencyD,
        });
      });
  }

  getBusinessTypeUpdater = () => {
    return this.getBusinessTypeUpdated.asObservable();
  }

  getBusinessUpdater = () => {
    return this.getBusinessUpdated.asObservable();
  }

  getBusinessIdUpdater = () => {
    return this.getBusinessIdUpdated.asObservable();
  }

  getBusiness = () => {
    this.http
      .get<any>(`${this.API_URL}organization/business/`)
      .subscribe(data => {
        this.business = data;
        this.getBusinessUpdated.next({
          business: this.business,
        });
      });
  }

  getBusinessId = (id: number) => {
    this.http
      .get<any>(`${this.API_URL}organization/business/${id}/`)
      .subscribe(data => {
        this.businessId = data;
        this.getBusinessIdUpdated.next({
          businessId: this.businessId,
        });
      });
  }

  get_dashboard() {
    this.http.get<any>(`${this.API_URL}organization/${this.key}/dashboard`).subscribe(
      data => {
        this.dash = data;
        this.graph = data['revenues'];
        this.get_dashboard_updated.next({
          dash: this.dash,
          graph: this.graph,
        });
      },
    );
  }

  getBusinessType = () => {
    this.http
      .get<any>(`${this.API_URL}organization/business_types/`)
      .subscribe(data => {
        this.businessType = data;
        this.getBusinessTypeUpdated.next({
          businessType: [...this.businessType],
        });
      });
  }

  getSectorUpdater = () => {
    return this.getSectorUpdated.asObservable();
  }

  getSector = () => {
    this.http
      .get<any>(`${this.API_URL}organization/sectors/`)
      .subscribe(data => {
        this.sectorD = data;
        this.getSectorUpdated.next({
          sectorD: [...this.sectorD],
        });
      });
  }

  getToken = () => {
    return this.token;
  }

  getTenant = () => {
    return this.tenant;
  }

  getIsAuthenticated = () => {
    return this.isAuthenticated;
  }

  getAuthenticationStatusListener = () => {
    return this.authenticationStatusListener.asObservable();
  }

  signUp = data => {
    // this._spinner.show();
    this.http
      .post<{
        user: any;
        token: string;
        tenant: string;
      }>(`${this.API_URL}users/`, data)
      .subscribe(
        response => {
          // this._spinner.hide();
          this.signIn(data);
        },
        error => {
        },
      );
  }

  signIn = data => {
    // this._spinner.show();
    this.http
      .post<any>(`${this.API_URL}users/login/`, data)
      .subscribe(
        response => {
          const Itoken = response.token;
          this.token = Itoken;
          const key = response.business.key;
          localStorage.setItem('key', key);
          this.business_type = response.business.business_type;
          localStorage.setItem('businessType', this.business_type);
          if (Itoken) {
            this.isAuthenticated = true;
            this.tenant = response.tenant;
            this.user = response.user;
            this.email = response.user.email;
            // this.business_key = response.business.key;
            this.business_name = response.business.business_name;
            this.permissions = response.permissions;
            this.authenticationStatusListener.next(true);
            this.saveAuthenticationData(this.token, this.tenant,
              this.user,
              //  this.business_key,
              this.business_name, this.email, this.permissions);
            // this.pnotify.notify(
            //   `Logged in`,
            //   `Welcome ${response.user.username}`,
            //   'success'
            // );
            if (this.user.first_login) {
              this.router.navigate(['/auth', 'onboarding']);
            } else {
              const k = response.business.key;
              localStorage.setItem('key', k);
              this.router.navigate(['/dashboard/main-dashboard']);
            }
            // this._spinner.hide();
          }
        },
        error => {
          console.log(error);
          // this.pnotify.notify('An error occured', `${error.message}`, 'error');
          this.authenticationStatusListener.next(false);
          // this._spinner.hide();
        },
      );
  }

  private getAuthenticationData = () => {
    const token = localStorage.getItem('token');
    const tenant = localStorage.getItem('tenant');
    const user = localStorage.getItem('user');

    if (!token || !tenant) {
      return;
    }
    return {
      tenant,
      token,
      user,
    };
  }

  // Logging user out
  logout() {
    // this.http.get<any>(`${this.API_URL}users/logout/`)
    this.tenant = null;
    this.token = null;
    this.isAuthenticated = false;
    this.user = null;
    this.email = null;
    this.business_key = null;
    this.business_name = null;
    this.business_type  = null;
    this.authenticationStatusListener.next(false);
    this.clearAuthenticationData();
    this.getAuthenticationStatusListener();

    this.router.navigate(['/auth', 'sign-in']);
    // this.pnotify.notify(
    //   'logged out',
    //   'You\'ve successfully logged out',
    //   'success'
    // );
  }

  saveAuthenticationData = (token: string, tenant: string, user: any,
                            // business: string,
                            business_name: string, email: string, perm: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('tenant', tenant);
    // localStorage.setItem('key', business);
    localStorage.setItem('email', email);
    localStorage.setItem('businessName', business_name);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('perm', JSON.stringify(perm));
  }

  automaticAuthenticateUser() {
    const authenticationInformation = this.getAuthenticationData();
    // console.log(authenticationInformation)
    if (!authenticationInformation) {
      return;
    } else {
      this.tenant = authenticationInformation.tenant;
      this.token = authenticationInformation.token;
      this.isAuthenticated = true;
      this.user = authenticationInformation.user;
      this.authenticationStatusListener.next(true);
    }
  }

  private clearAuthenticationData() {
    localStorage.removeItem('tenant');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('perm');
    localStorage.removeItem('key');
    localStorage.removeItem('businessName');
    localStorage.removeItem('businessType');
  }

  addBusiness = data => {
    this.http
      .post<any>(`${this.API_URL}organization/business/`, data)
      .subscribe(response => {
        const key = response.key;
        const business_name = response.business_name;
        const businessType = response.business_type;
        localStorage.setItem('key', key);
        localStorage.setItem('businessName', business_name);
        localStorage.setItem('businessType', businessType);
        // this.pnotify.notify('Business Added', 'Successfully', 'success');

      });
    this.router.navigate(['/dashboard/main-dashboard']);
  }

}
