import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContextMenuItem } from 'src/app/models/context-menu-item';

@Component({
  selector: 'oph-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  _contextMenuItems: ContextMenuItem[] = [
    {text: "Opción 1", value: "opcion1"},
    {text: "Opción 2", icon: "fas fa-times"},
    {text: "Opción 3", badgetColor: "red"}
  ]
  _target: string;

  

  @Output()
  onClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() set target(target: string){
    this._target = target;
  }

  @Input() set items(items: ContextMenuItem[]){
    this._contextMenuItems = items;
  }

  itemClick(value): void {
    this.onClick.emit(value);
  }

  //#region Methods
  constructor() { }

  ngOnInit(): void {
  }
}

