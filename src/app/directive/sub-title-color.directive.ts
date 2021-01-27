import { Directive, ElementRef, NgModule, Input } from '@angular/core';
import { SessionService } from '../services/session.service';
import { SharedService } from '../services/shared.service';
import { Theme } from '../models/theme';
import { StylingService } from '../services/styling.service';

@Directive({
  selector: '[ophSubTitleColor]'
})
export class SubTitleColorDirective {

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
        this.stylingService.setSubTitleColorStyle((this.el.nativeElement as HTMLElement), theme);
      }, 1);
    }
  }

}

@NgModule({
  declarations: [SubTitleColorDirective],
  exports: [SubTitleColorDirective]
})
export class SubTitleColorDirectiveModule { }
