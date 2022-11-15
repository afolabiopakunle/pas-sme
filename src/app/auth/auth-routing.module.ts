import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NbAuthComponent} from '@nebular/auth';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'on-boarding', component: OnBoardingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
