import { Injectable } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {

  constructor(private toasterService: NbToastrService) { }
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  public showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: this.position,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : '';

    this.toasterService.show(
      body,
      `${titleContent}`,
      config);
  }
}
