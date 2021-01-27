import { Directive, ElementRef, NgModule } from '@angular/core';
import { Theme } from '../models/theme';
import { SessionService } from '../services/session.service';
import { SharedService } from '../services/shared.service';
import { StylingService } from '../services/styling.service';

@Directive({
  selector: '[ophToolBarColors]'
})
export class ToolBarColorsDirective {

  constructor(
    private el: ElementRef,
    private sharedService: SharedService,
    private stylingService: StylingService,
    private sesionService: SessionService
  ) {
    this.setStyle(this.sesionService.session.selectedCompany?.theme);
    this.sharedService.companyChanged.subscribe(comp => {
      if (comp) {
        this.setStyle(comp?.theme);
      }
    });
  }

  setStyle(theme: Theme) {
    if (theme) {
      setTimeout(() => {
        this.stylingService.setToolBarColors((this.el.nativeElement as HTMLElement), theme);
      }, 200);
    }
  }

}

@NgModule({
  declarations: [ToolBarColorsDirective],
  exports: [ToolBarColorsDirective]
})
export class ToolBarColorsModule { }
