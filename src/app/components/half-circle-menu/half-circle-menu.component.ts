import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'oph-half-circle-menu',
  templateUrl: './half-circle-menu.component.html',
  styleUrls: ['./half-circle-menu.component.scss']
})
export class HalfCircleMenuComponent implements OnInit {
  
  @ViewChild("fanMenu") fanMenu;
  @ViewChild("tooltip") tooltip;

  @Output()
  onMenuBtnClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onWingSelected: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onWingHovered: EventEmitter<any> = new EventEmitter<any>();

  @Input() set wings(wings: any[]) {
    this.options.angle = `${180 / wings.length}`;
    this.startAngles.topLeft = 180.5 + parseInt(this.options.angle) / 2,
    this._wings = wings;
  }

  @Input() set unabledWings(unabledWings: boolean[]) {
    this._unabledWings = unabledWings;
  }

  _yPosition = window.innerHeight - 65;
  _xPosition = (window.innerWidth / 2) - 35;
  _unabledWings: boolean[];
  _wingIsHovered: boolean; 

  _wings = [
    {
      "title": "",
      "color": "rgba(0,0,0,0.46)",
      "icon": { "name": "fa fa-tablet" }
    },
    {
      "title": "",
      "color": "rgba(70,70,70,0.46)",
      "icon": { "name": "fa fa-laptop" }
    },
    {
      "title": "",
      "color": "rgba(70,70,70,0.46)",
      "icon": { "name": "fa fa-phone" }
    },
    {
      "title": "",
      "color": "rgba(70,70,70,0.46)",
      "icon": { "name": "fa fa-mobile" }
    }
  ];

  public options = {
    "buttonOpacity": "1",
    "wingFontWeight": "500",
    "buttonBackgroundColor": "#4a85bc",
    "buttonCrossImgSize": "40%",
    "spinable": false,
    "radius": "130",
    "offset": "30",
    "angle": `${180 / this._wings.length}`,
    "onlyIcons": true,
    "defaultOpen": false
  };

  public startAngles = {
    "topLeft": 180.5 + parseInt(this.options.angle) / 2,
    "topRight": 0,
    "bottomRight": 0,
    "bottomLeft": 0
  }

  public menuGutter = {
    "top": this._yPosition,
    "bottom": 0,
    "right": 0,
    "left": this._xPosition
  }

  //#region Methods
  constructor() {
    // for (let wing in this._wings) {
    //   this._wings[wing].color = "rgba(20,120,120,0.46)"
    // }
  }

  ngOnInit(): void {
  }

  onResize(event) {
    this._xPosition = (window.innerWidth / 2) - 35
    this._yPosition = window.innerHeight - 65;
    this.fanMenu.elm.nativeElement.children[0].offsetParent.style.cssText= `width: 60px; 
    height: 60px; font-family: sans-serif; top: ${this._yPosition}px; left: ${this._xPosition}px;`
  }

  menuBtnClicked(e) {
    this.onMenuBtnClicked.emit(e);
  }

  wingSelected(e) {
    this.onWingSelected.emit(e);
  }

  wingHovered(e){
    this.tooltip.nativeElement.innerHTML = e.title;
    this.tooltip.nativeElement.style.top = `${this._yPosition - 165}px`;
    this.tooltip.nativeElement.style.left = `${(this._xPosition + 31) - (this.tooltip.nativeElement.offsetWidth / 2)}px`;
    this.tooltip.nativeElement.style.visibility = "visible"
  }

  hoveredOut(){
    this.tooltip.nativeElement.style.visibility = "hidden"
  }

}