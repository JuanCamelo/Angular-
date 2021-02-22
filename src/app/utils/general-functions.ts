import { Injectable } from "@angular/core";
import { SessionService } from "../services/session.service";
import { StylingService } from "../services/styling.service";

@Injectable({
  providedIn: 'root'
})
export class GeneralFunctions {

  constructor(/* private sessionService: SessionService,
    private stylingService: StylingService,
    private generalFunctions: GeneralFunctions */) {}

  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /* onContentReady(e: any) {
    if (this.sessionService.session) {
      setTimeout(() => {
        const gridEl = document.getElementById(this.gridId);
        if (gridEl && this.sessionService.session.selectedCompany.theme !== null) {
          this.stylingService.setGridHeaderColorStyle(gridEl, this.sessionService.session.selectedCompany.theme);
          this.stylingService.setGridHeaderTextColorStyle(gridEl, this.sessionService.session.selectedCompany.theme);
        }
      }, 1);
    }
  } */


}
