export class ListAppointmentDTO {
  idTipoDocumento: string;
  numeroDocumento: string;
  contrato: string;
  idTipoCita: string;
  idTipoEspecialidad: string;
  idTipoProcedimiento: string;
  fechaAsignacion: Date;
  fechaDeseada: Date;
  constructor() {
    this.idTipoDocumento = '';
    this.numeroDocumento = '';
    this.contrato = '';
    this.idTipoCita = '';
    this.idTipoEspecialidad = '';
    this.idTipoProcedimiento = '';
    this.fechaAsignacion = null;
    this.fechaDeseada = null;
  }
}

export class TypeDocumentDTO {
  idDTO: string;
  descripcionDTO: string;
  empresasValido: boolean;
  personasValido: boolean;
}

export class TypeOfAppointment {
  text: string;
  iconColor: string;
  stateCode: string;
}

export class TypeOfSpecialty {
  idDTO: string;
  estadoDTO: boolean;
  descripcionDTO: string;
}

export class TypeOfProcedure {
  idDTO: string;
  descripcionDTO: string;
}

export class CitasPacientesDTO {
  idCita: string;
  citaFecha: Date;
  pacienteNombre: string;
  edad: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  contrato: string;
  tipoCita: string;
  procedimiento: string;
  especialidad: string;
  citaFechaDeseada: Date;
}

export class TypeOfContract {
  idDTO: string;
  descripcionDTO: string;
}