import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { AuthService } from '../auth-services/auth.service';
import { ILogin } from '../auth-services/auth.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  user = {
    email: '',
    password: '',
  };

  login() {
    const {email, password} = this.signInForm.value;
    const data: ILogin = {email, password};
    this.authService.signIn(data);
  }

}
