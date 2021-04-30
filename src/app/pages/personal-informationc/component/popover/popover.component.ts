import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oph-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {

  @Input() popoverVisible:boolean;
  @Input() popoverTarget:string;
  @Output() FormRequest: EventEmitter<any> = new EventEmitter();
  formRequest = {
  value:''
  }
  constructor() { }

  onActionClickPrest(e){
    this.FormRequest = e.value
    console.log(e,"desdes el eceve")
    console.log(this.FormRequest)
  }

  ngOnInit() {
    
  }

}
