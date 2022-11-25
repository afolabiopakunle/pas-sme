import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFinancialYearComponent } from './set-financial-year.component';

describe('SetFinancialYearComponent', () => {
  let component: SetFinancialYearComponent;
  let fixture: ComponentFixture<SetFinancialYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetFinancialYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFinancialYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
