import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef,ChangeDetectorRef,AfterContentChecked } from '@angular/core';
import { ItemSaveInfo } from 'src/app/models/ItemSaveInfoPhsysicalExam';

@Component({
  selector: 'oph-item-accordion',
  templateUrl: './item-accordion.component.html',
  styleUrls: ['./item-accordion.component.scss']
})
export class ItemAccordionComponent implements OnInit {
  @ViewChild("descripcion") descripcion;

  @Input() item: any

  @Output()
  onValueChange: EventEmitter<ItemSaveInfo> = new EventEmitter<ItemSaveInfo>();
  
  textbox: any;
  constructor(private cdref: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }


  onCheckValueChange(item, subOpcion: boolean, parentItem: any, event) {
    const { idOpcionesItemExamenFisico: id, opcionesItemDescripcion: descripcion, idSubOpcionesItemExamenFisico, subOpcionesItemExamenFisicosDTO } = item
    if (event) {
      /* parentItem.descripcion = parentItem.descripcion ? `${parentItem.descripcion}, ${descripcion}` : descripcion */
      this.textbox = this.textbox ? `${this.textbox}, ${descripcion}` : descripcion
      
    } else {
      const regex = new RegExp(`^${descripcion}, |, ${descripcion}|${descripcion}`, 'g')
      /* parentItem.descripcion = parentItem.descripcion.replace(regex, '') */
      this.textbox = this.textbox.replace(regex, '')
    }
    // Actualiza campo checkBox
    /* this.onValueChange.emit({ id: id || idSubOpcionesItemExamenFisico, descripcion: this.textbox || subOpcionesItemExamenFisicosDTO, value: event, subOpcion, capturaTexto: false }) */
    this.onValueChange.emit({ id: parentItem , descripcion: this.textbox || subOpcionesItemExamenFisicosDTO})
  }

  onDescriptionChanged({ value }, { idOpcionesItemExamenFisico: id, opcionesItemDescripcion: descripcion }) {
    /* this.onValueChange.emit({ id, descripcion, value, subOpcion: false, capturaTexto: true }) */
    this.onValueChange.emit({ id, descripcion})
  }

  onValueChangedDescription(descripcion){
    
    this.onValueChange.emit({id:this.item.zonaExamenFisicoIdHead, descripcion})    
    
  }
}