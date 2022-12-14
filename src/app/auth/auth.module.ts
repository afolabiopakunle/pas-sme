import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule, NbSelectModule,
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NgxAuthRoutingModule,

        NbAuthModule,
        ReactiveFormsModule,
        NbSelectModule,
    ],
  declarations: [
    // ... here goes our new components
    LoginComponent,
    RegisterComponent,
    OnBoardingComponent,
  ],
})
export class NgxAuthModule {
}
