import { Component, OnInit } from '@angular/core';
import * as data from '../../../assets/helpers/version.json';

@Component({
  selector: 'oph-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {
  version: any;
  popupVisible = false;
  versionTitle : string;
  versionTitleDate : string;

  constructor() {
    this.versionTitle = data[0].version;
    this.versionTitleDate = data[0].date;
  }


  showInfo() {
    this.version = data[0];        
    this.popupVisible = true;
  }

  ngOnInit() {
  }

}
