import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { getDeepFromObject, NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbAuthSocialLink } from '@nebular/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';
import { ISignup } from '../auth-services/auth.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';
  signupForm: FormGroup;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router,
              private authService: AuthService,
              private fb: FormBuilder) {

    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');

    this.signupForm = this.fb.group({
        email: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.email,
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      terms: new FormControl(null, [
        Validators.required,
      ]),
      },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  signUp = () => {
    this.errors = this.messages = [];
    this.submitted = true;
    if (this.signupForm.valid) {
      const {email, password} = this.signupForm.value;
      const data: ISignup = {email, password};
      this.authService.signUp(data);
    }

  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
