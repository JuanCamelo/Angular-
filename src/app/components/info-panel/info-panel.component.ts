import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oph-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  @Input() infoPanelList: { icon: string, text: string, iconColor: string }[]
  @Input() title: string
  @Input() horizontal: boolean
  @Input() iconSize = 1

  constructor() { }

  ngOnInit() {
  }

}
