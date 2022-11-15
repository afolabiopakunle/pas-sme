import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../@core/toaster.service';

@Component({
  selector: 'ngx-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss'],
})
export class OnBoardingComponent implements OnInit {

  constructor(private toaster: ToasterService) { }

  ngOnInit(): void {
    this.toaster.showToast('success', 'Welcome!', 'Successfully signed up');
  }

}
