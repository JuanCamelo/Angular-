import { Component, Input, OnInit } from '@angular/core';
import { CurrentProgrammingData } from '../../../models/appointment-management/currentProgrammingData';

@Component({
  selector: 'oph-current-programming-data',
  templateUrl: './current-programming-data.component.html',
  styleUrls: ['./current-programming-data.component.css']
})
export class CurrentProgrammingDataComponent implements OnInit {
  @Input() isRescheduling:boolean = false;
  @Input() currentProgrammingData: CurrentProgrammingData;
  tooltipProcedimiento:boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  toggleProcedimiento = () => this.tooltipProcedimiento = !this.tooltipProcedimiento;
}
