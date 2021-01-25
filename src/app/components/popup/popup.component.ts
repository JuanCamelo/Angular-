import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
// import { ServicesGeneric } from 'src/app/services/api/klinic-generic-service';

@Component({
  selector: 'oph-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() isVisiblePopup: boolean;
  @Input() dataObject: any[] = [];
  @Input() messageInformation: string;
  @Input() groupsReason: string[] = [];
  @Input() urlMetod: string;

  @Output() hidePopup: EventEmitter<boolean> = new EventEmitter();
  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
  }
  onHiding() {
    this.hidePopup.emit(false);
  }
  executeAction() {
    this.sharedService.showLoader(true);    
  }
}
