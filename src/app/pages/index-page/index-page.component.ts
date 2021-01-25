import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { SharedService } from 'src/app/services/shared.service';
import * as reduxActions from '../../store/actions';

@Component({
  selector: 'oph-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    public sharedService: SharedService
  ) {
  }

  ngOnInit() {
  }

}
