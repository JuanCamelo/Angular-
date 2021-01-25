import { Component, OnInit, Input } from '@angular/core';
import { EnumsBadgets } from 'src/app/enums/example.enum';

@Component({
  selector: 'oph-badget',
  templateUrl: './badget.component.html',
  styleUrls: ['./badget.component.css']
})
export class BadgetComponent implements OnInit {
  @Input() state: string;
  nameState: string;
  constructor() { }

  ngOnInit(): void {
  }
  setColorState() {
    switch (this.state) {
      case EnumsBadgets.ASIGNED:
        this.nameState = EnumsBadgets.ASIGNED;
        return { 'background-color': EnumsBadgets.STATE_ASIGNED };
      case EnumsBadgets.REASIGNED:
        this.nameState = EnumsBadgets.REASIGNED;
        return { 'background-color': EnumsBadgets.STATE_RE_ASIGNED };
      case EnumsBadgets.NOTASIGNED:
        this.nameState = EnumsBadgets.NOTASIGNED;
        return { 'background-color': EnumsBadgets.STATE_NOT_ASIGNED };
      default:
        this.nameState = EnumsBadgets.NOT_ASIGNED;
        return { 'background-color': EnumsBadgets.STATE_DEFAULT };
    }
  }
}
