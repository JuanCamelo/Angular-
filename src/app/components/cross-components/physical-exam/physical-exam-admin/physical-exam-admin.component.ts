import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemSaveInfo } from 'src/app/models/ItemSaveInfoPhsysicalExam';

// Redux
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as reduxActions from 'src/app/store/actions';
import { PhysicalExamService } from '../services/physical-exam.service';

@Component({
  selector: 'oph-physical-exam-admin',
  templateUrl: './physical-exam-admin.component.html',
  styleUrls: ['./physical-exam-admin.component.scss']
})
export class PhysicalExamAdminComponent implements OnInit {

  physicalExams: any[] = []
  indexSelected = null
  itemsModifiedList: ItemSaveInfo[] = []
  muestraTexto: boolean;
  accordionItems = [
    {

    }
  ]
  titles = ["Examén Fisico"]

  constructor(
    private sharedService: SharedService,
    private physicalExamService: PhysicalExamService,
    private store: Store<AppState>
  ) {
    physicalExamService.getExamPhysical().subscribe(response => {
      this.physicalExams = response.map(data => {
        return { ...data, text: data.zonaExamenFisicoDescripcion }
      })
      this.physicalExams[0].isVisible = true
    })
  }

  ngOnInit() { }

  itemClick(e) {
    const newValue = !this.physicalExams[e].isVisible
    this.physicalExams[e].isVisible = newValue
    this.muestraTexto = this.physicalExams[e].isVisible;
  }

  onSave() {

    this.physicalExamService.saveExamPhysical(this.itemsModifiedList).subscribe((response: any) => {
      if (response[0] == 'Registro satisfactorio!!') {
        this.sharedService.success(`${response}`, true)
      }
      else {
        this.sharedService.error(`${response}`, true)
      }

      setTimeout(() => {
        location.reload();
      }, 3000)
    })
  }

  onValueChange(data: ItemSaveInfo) {
    const indexFind = this.itemsModifiedList.findIndex(itemFind => itemFind.id === data.id)
    if (indexFind > -1) {
      this.itemsModifiedList[indexFind] = data
    } else {
      this.itemsModifiedList.push(data)
    }

    this.store.dispatch(reduxActions.setClinicalSummary({ clinicalSummary: { physicalExam: [...this.itemsModifiedList], idRegistromedico: "434D21E7-1BEA-4622-A794-816530393999"}}));
  }
}
