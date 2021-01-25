import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { ConfigService } from 'src/app/services/config.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as reduxActions from '../../../../app/store/actions';


@Component({
  selector: 'oph-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class VitalsComponent implements OnInit {

  formData: Vitals = new Vitals();

  lastAttentionsFilter;

  lastAttentionsItems = [
    {
      Id: 1,
      Description: "Últimas 5 Atenciones"
    },
    {
      Id: 2,
      Description: "Últimas 10 Atenciones"
    },
    {
      Id: 3,
      Description: "Últimas 15 Atenciones"
    },
  ]
  gridData: VitalSignHistorical[] = [
    {
      Fecha: "12/03/2020",
      Temperatura: "35 °C",
      FrecuenciaCardiaca: "80",
      FrecuenciaRespiratoria: "15",
      TensionSistolica: "124",
      TensionDiastolica: "60",
      SaturacionOxigeno: "92"
    },
    {
      Fecha: "17/02/2020",
      Temperatura: "36.5 °C",
      FrecuenciaCardiaca: "82",
      FrecuenciaRespiratoria: "18",
      TensionSistolica: "128",
      TensionDiastolica: "85",
      SaturacionOxigeno: "98"
    },
    {
      Fecha: "10/02/2020",
      Temperatura: "36 °C",
      FrecuenciaCardiaca: "84",
      FrecuenciaRespiratoria: "18",
      TensionSistolica: "126",
      TensionDiastolica: "80",
      SaturacionOxigeno: "92"
    },
    {
      Fecha: "17/01/2020",
      Temperatura: "35.2 °C",
      FrecuenciaCardiaca: "81",
      FrecuenciaRespiratoria: "16",
      TensionSistolica: "124",
      TensionDiastolica: "82",
      SaturacionOxigeno: "89"
    },
    {
      Fecha: "11/01/2020",
      Temperatura: "34.1 °C",
      FrecuenciaCardiaca: "78",
      FrecuenciaRespiratoria: "18",
      TensionSistolica: "128",
      TensionDiastolica: "79",
      SaturacionOxigeno: "88"
    },
    {
      Fecha: "02/01/2020",
      Temperatura: "36.7 °C",
      FrecuenciaCardiaca: "78",
      FrecuenciaRespiratoria: "20",
      TensionSistolica: "122",
      TensionDiastolica: "83",
      SaturacionOxigeno: "92"
    }
  ]

  icons: VitalsIcon[] = [
    {
      Id: 1,
      Icon: "fas fa-thermometer-quarter",
      Label: "Temperatura:",
      Color: "#462521",
      Placeholder: "°C"
    },
    {
      Id: 2,
      Icon: "fas fa-heartbeat",
      Label: "Frecuencia Cardíaca:",
      Color: "#D00000",
      Placeholder: "lat/min"
    },
    {
      Id: 3,
      Icon: "fas fa-lungs",
      Label: "Frecuencia Respiratoria:",
      Color: "#CC76A1",
      Placeholder: "Res/min"
    },
    {
      Id: 4,
      Icon: "fas fa-lungs",
      Label: "Saturacion De Oxigeno:",
      Color: "#CC76A1",
      Placeholder: "%"
    },
    {
      Id: 5,
      Icon: "fas fa-head-side-cough",
      Label: "Fraccion De Oxigeno Inspirado:",
      Color: "#FCD0A1",
      Placeholder: "%"
    },
    {
      Id: 6,
      Icon: "fas fa-stethoscope",
      Label: "Tension Arterial De Pie:",
      Color: "#2660A4",
      Placeholder: "mmHg"
    },
    {
      Id: 7,
      Icon: "fas fa-stethoscope",
      Label: "Tension Arterial Acostado:",
      Color: "#2660A4",
      Placeholder: "mmHg"
    }
  ];

  imperiumUrl: string = null;

  constructor(
    private configService: ConfigService,
    private sesionService: SessionService,
    private store: Store<AppState>,
  ) {
    this.getImperiumUrl()
  }

  ngOnInit() {
  }

  getImperiumUrl() {
    const session = this.sesionService.session
    const queryParams = `?token=${session ? session.token : 'nullToken'}${this.configService.config.imperiumParamsDash3}`
    const imperiumUrl = this.configService.config.urlImperium + queryParams
    this.imperiumUrl = imperiumUrl
  }

  onFormChanged(e) {
    const clinicalSummaryAction = reduxActions.setClinicalSummary({
      clinicalSummary: { vitalSigns: { ...this.formData } },
    })

    this.store.dispatch(clinicalSummaryAction);
  }

}

export class Vitals {
  Temperatura: string;
  FecuenciaCardiaca: string;
  FrecuenciaRespiratoria: string;
  SaturacionOxigeno: string;
  FraccionOxigenoInspirado: string;
  PresionArterialDePieSistolica: string;
  PresionArterialDePiaDiastolica: string;
  PresionArterialAcostadoSistolica: string;
  PresionArterialAcostadoDiastolica: string;
  ViaTomaTemperatura: string;
  Peso: string;
  Talla: string;
  PerimetroAbdominal: string;
  IndiceDeMasaCorporal: string;
  Clasificacion: string;
  constructor() {
    this.Temperatura = ''
    this.FecuenciaCardiaca = ''
    this.FrecuenciaRespiratoria = ''
    this.SaturacionOxigeno = ''
    this.FraccionOxigenoInspirado = ''
    this.PresionArterialDePieSistolica = ''
    this.PresionArterialDePiaDiastolica = ''
    this.PresionArterialAcostadoSistolica = ''
    this.PresionArterialAcostadoDiastolica = ''
    this.ViaTomaTemperatura = ''
    this.Peso = ''
    this.Talla = ''
    this.PerimetroAbdominal = ''
    this.IndiceDeMasaCorporal = ''
    this.Clasificacion = ''
  }
}

export class VitalsIcon {
  Id: number;
  Icon: string;
  Label: string;
  Color: string;
  Placeholder?: string;
}

export class VitalSignHistorical {
  Fecha: string;
  Temperatura: string;
  FrecuenciaCardiaca: string;
  FrecuenciaRespiratoria: string;
  TensionSistolica: string;
  TensionDiastolica: string;
  SaturacionOxigeno: string;
}