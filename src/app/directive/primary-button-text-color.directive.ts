import { Directive, ElementRef, NgModule } from '@angular/core';
import { SessionService } from '../services/session.service';
import { SharedService } from '../services/shared.service';
import { Theme } from '../models/theme';
import { StylingService } from '../services/styling.service';

@Directive({
  selector: '[ophPrimaryButtonTextColor]'
})
export class PrimaryButtonTextColorDirective {

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
        this.stylingService.setPrimaryButtonTextColorStyle((this.el.nativeElement as HTMLElement), theme);
      }, 1);
    }
  }

}

@NgModule({
  declarations: [PrimaryButtonTextColorDirective],
  exports: [PrimaryButtonTextColorDirective]
})
export class PrimaryButtonTextColorDirectiveModule { }
