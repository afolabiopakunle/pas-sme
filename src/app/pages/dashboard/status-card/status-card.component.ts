import { Component, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { SetFinancialYearComponent } from '../set-financial-year/set-financial-year.component';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card [ngClass]="{'off': !on}" (click)="setFinancialPeriod(title)">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ on ? 'ON' : 'No Financial Period Set yet' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = false;
  constructor(private dialogService: NbDialogService) {}

  setFinancialPeriod(title) {
    if (title === 'Current Financial Period') {
      this.dialogService.open(SetFinancialYearComponent)
        .onClose.subscribe(formpicker => {
        console.log(formpicker);
      });
    }
  }
}
