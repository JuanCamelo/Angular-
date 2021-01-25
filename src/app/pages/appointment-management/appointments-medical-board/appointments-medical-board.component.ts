import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'oph-appointments-medical-board',
  templateUrl: './appointments-medical-board.component.html',
  styleUrls: ['./appointments-medical-board.component.css']
})
export class AppointmentsMedicalBoardComponent implements OnInit {
  private urlApi: string;
  schedulerFrameUrl:String;

  constructor(private configService: ConfigService) { 
    this.urlApi = this.configService.config.urlAppointmentScheduler;
    this.schedulerFrameUrl = `${this.urlApi}?calendarioId=83442F5E-C880-4AFC-8E16-7EE59B07A46E`;
  }

  ngOnInit() {
    
  }

}
