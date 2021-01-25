import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oph-card-record',
  templateUrl: './card-record.component.html',
  styleUrls: ['./card-record.component.scss']
})
export class CardRecordComponent implements OnInit {

  _dataSource: any[];
  _headers: string[];
  _iconClasses: string[];

  _maxIterations: number = 5;
  

  @Output()
  onClickEditButton: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onClickDeleteButton: EventEmitter<any> = new EventEmitter<any>();

  @Input() set dataSource(dataSource: any[]) {
    this._dataSource = dataSource;
  }

  @Input() set headers(headers: string[]) {
    this._headers = headers;
  }
  
  @Input() set iconClasses(iconClasses: string[]) {
    this._iconClasses = iconClasses;
  }
  
  keyValueOrder(){
    return 0;
  }

  clickEditButton(element: any){
    this.onClickEditButton.emit(element);
  }

  clickDeleteButton(element: any){
    this.onClickDeleteButton.emit(element);
  }

  hasObservers(eventEmitter: EventEmitter<any>): boolean {
    return eventEmitter.observers.length > 0;
  }

  //#region Methods
  constructor() {
  }

  ngOnInit(): void {
  }
}