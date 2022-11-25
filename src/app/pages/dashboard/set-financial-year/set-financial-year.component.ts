import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-set-financial-year',
  templateUrl: './set-financial-year.component.html',
  styleUrls: ['./set-financial-year.component.scss'],
})
export class SetFinancialYearComponent {

  constructor(protected ref: NbDialogRef<SetFinancialYearComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(startDate, endDate) {

    const data = {
      end_date: endDate,
      start_date: startDate,
    };

    console.log({data});
    this.ref.close(data);
  }

}
