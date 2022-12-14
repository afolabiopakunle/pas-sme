import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {UserData} from '../../../@core/data/users';
import {LayoutService} from '../../../@core/utils';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import { AuthService } from '../../../auth/auth-services/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any = {};

  themes = [
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'default',
      name: 'Light',
    },
  ];

  currentTheme = 'default';

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: NbAuthService,
              private myAuthService: AuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token; // here we receive a payload from the token
          console.log(this.user.token);
        }

      });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
// tslint:disable-next-line:no-console
    console.log(this.user);
      this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  switchTheme() {
    if (this.currentTheme === 'default') {
      this.changeTheme('dark');
    } else {
      this.changeTheme('default');
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      // Do something on Log out
      this.myAuthService.logout();
      console.log('Log out Clicked ');
    } else if ( title === 'Profile' ) {
      // Do something on Profile
      console.log('Profile Clicked ');
    }
  }

}
