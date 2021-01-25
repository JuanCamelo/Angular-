import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsTab } from 'src/app/models/TabsMenu';

@Component({
  selector: 'oph-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.css']
})
export class TabsMenuComponent implements OnInit {

  @Input() tabsList: ItemsTab[] = []

  @Output() onTabClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { }

  onTabClicked({ itemData }) {
    this.onTabClick.emit(itemData);
    if (!itemData.url) return
    this.router.navigate(['./', itemData.url], { relativeTo: this.activatedRoute })
  }

}
