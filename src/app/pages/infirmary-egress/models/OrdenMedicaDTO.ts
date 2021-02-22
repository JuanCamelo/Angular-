import { PersonalAsistencialDTO } from "src/app/models/medical-diary";

export class OrdenMedicaDTO {

constructor (){
    this.id="";
    this.fechaHora="";
    this.cantidadPeriodicidad=0;
    this.admision="";
    this.registroMedico="";
    this.autorizacion="";
    this.personalAsistencialOrdena=new PersonalAsistencialDTO();
    this.unidadPeriodicidad="";
    this.cantidadDuracion=0;
    this.unidadDuracion="";
    this.observaciones="";
    this.instalacionPrestadorOrdena="";
    this.idNumerico=0;
    this.tipoOrdenMedica="";
    this.estadoOrdenMedica="";
}   

    id: string;
    fechaHora: string;
    cantidadPeriodicidad: number;
    admision: string;
    registroMedico: string | null;
    autorizacion: string | null;
    personalAsistencialOrdena: PersonalAsistencialDTO;
    unidadPeriodicidad: string;
    cantidadDuracion: number;
    unidadDuracion: string;
    observaciones: string;
    instalacionPrestadorOrdena: string;
    idNumerico: number;   
    estadoOrdenMedica: string;
    tipoOrdenMedica:string;
}