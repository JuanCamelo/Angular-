import { Component, OnInit, Input } from '@angular/core';

export interface Itemindicator {
  name: string,
  value: string | number
}

@Component({
  selector: 'oph-list-card-header',
  templateUrl: './list-card-header.component.html',
  styleUrls: ['./list-card-header.component.scss']
})
export class ListCardHeaderComponent implements OnInit {

  @Input() listItems: Itemindicator[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
