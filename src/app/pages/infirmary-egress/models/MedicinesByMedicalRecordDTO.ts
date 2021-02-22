export class MedicinesByMedicalRecordDTO {
constructor (){
    this.idOrdenMedica= "";
    this.idRegistroMedico= "" ;
    this.estadoOrden= "";
    this.idNumerico= 0;
    this.fechaHora= "";
    this.medicamento= null;
    this.nombrePersonalAsistencial="";
    this.medicamento= "";   
    this.dosis="";
    this.cantidadEntregarFarmacia=0;
}

    idOrdenMedica: string;
    idRegistroMedico: string | null;
    estadoOrden: string;
    idNumerico: number;
    fechaHora: string;
    medicamento: string;
    nombrePersonalAsistencial: string;
    dosis: string;
    cantidadEntregarFarmacia: number | null;
}