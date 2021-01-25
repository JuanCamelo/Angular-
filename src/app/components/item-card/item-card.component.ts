import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oph-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() backColor: string;
  @Input() iconBody: string;
  @Input() textBody: string;
  @Input() relativeRedirection: string | string[];

  @Output() onCardClicked: EventEmitter<void> = new EventEmitter();


  constructor() { }

  ngOnInit() { }

}
