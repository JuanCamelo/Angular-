// Angular
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'oph-round-button',
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.css']
})
export class RoundButtonComponent implements OnInit {

  public styles: RoundButtonStylesConfig = {
    background: "#17175F",
    color: "#ffffff",
    width: "60px",
    height: "60px",
    "font-size": "30px",
  };

  _className: string = "fas fa-info";
  _tooltip: string = "";
  _link: string;


  @Output()
  onClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() set className(classname: string) {
    this._className = classname;
  }

  @Input() set tooltip(tooltip: string) {
    this._tooltip = tooltip;
  }

  @Input() set background(background: string) {
    this.styles.background = background;
  }

  @Input() set color(color: string) {
    this.styles.color = color;
  }

  @Input() set linkref(linkref: string) {
    this._link = linkref;
  }

  @Input() set size(size: number) {
    this.styles.width = `${size}px`;
    this.styles.height = `${size}px`;
    this.styles["font-size"] = `${size / 2}px`;
  }

  //#region Methods
  constructor() { }

  ngOnInit(): void {
  }
}

export class RoundButtonStylesConfig {
  background: string;
  color: string;
  width: string;
  height: string;
  "font-size": string;
}
