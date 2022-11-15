import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../@core/toaster.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss'],
})
export class OnBoardingComponent implements OnInit {
  onboardForm: FormGroup;
  sectorC: any[] = [];
  businessTypeC: any[] = [];
  currencyC: any;
  countryC: any[] = [];
  Sub: Subscription;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private toaster: ToasterService) {
    this.onboardForm = this.fb.group({
      business_name: new FormControl('', [Validators.required]),
      sector: new FormControl('', [Validators.required]),
      business_type: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      primary_currency: new FormControl('', [Validators.required]),
    });
  }

  inItContents() {
    this.authService.getSector();
    this.authService.getBusinessType();
    this.authService.getCountry();
    this.authService.getCurrency();

    this.Sub = this.authService.getCountryUpdater().subscribe(
      data => {
        this.countryC = data.countryD;
      },
    );
  }

  addSector = (e: string) => {
    localStorage.setItem('sector', e);
  }

  onBoard = () => {
    const {
      business_name,
      sector,
      business_type,
      telephone,
      address,
      primary_currency,
      country,
    } = this.onboardForm.value;

    const data: any = {
      business_name,
      sector,
      business_type,
      telephone,
      address,
      country,
      primary_currency,
    };
    this.authService.addBusiness(data);
  }

  ngOnInit(): void {
    this.toaster.showToast('success', 'Welcome!', 'Successfully signed up');
    this.inItContents();
  }

}
