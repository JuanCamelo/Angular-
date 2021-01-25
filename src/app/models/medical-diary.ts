export class MedicalDiary {
}

/**
 * Dia de la semana
 */
export class WeekDayDTO {
  Id: string;
  Descripcion: string;
  Estado: boolean;
}

/**
 * Dia de la semana
 */
export class TypeDocumentDTO {
  id: string;
  descripcion: string;
  validoEmpresas: boolean;
  validoPersonas: boolean;
}

/**Filtro cita medica */
export class FilterAppointmentDTO {
  idTipoDocumento: string;
  noDocumento: string;
  nombrePaciente: string;
  idEstadoCita: string;
  fechaCita: Date;
}

/**
 * Especialidad medica
 */
export class EspecialidadMedicaDTO {
  Id: string;
  Descripcion: string;
  Estado: boolean;
}

/**
 * Especialidad medica
 */
export class ContractsDTO {
  Id: string;
  FechaInicial: Date;
  FechaFinal: Date;
  Estado: string
  Moneda: string
  Pagador: string
  Pais: string
  TipoContrato: string
  TipoContratoNavigation: {
    Id: string,
    Descripcion: string,
    Estado: boolean,
    ValorMaximo: boolean,
    MontoFijo: boolean,
    Evento: boolean
  }
}

/**
 * Especialidad medica
 */
export class MedicalProcedureDTO {
  Id: string;
  Descripcion: string;
  Estado: boolean;
  EsEstancia: boolean;
  DuracionMinutos: number;
}

/**
 * Profesional
 */
export class PersonalAsistencialDTO {
  NameProfessional: string;
  TipoDocumento: number
  NumeroDocumento: string;
  sedeId?: string;
  specialityId?: string
}

/**
 * Sedes
 */
export class InstalacionPerDTO {
  Id: number;
  Descripcion: string;
  Tipo: number;
  Idsuperior: number;
  Estado: number;
  Prestador: number;
  Servicio: number;
  VisibleAgenda: boolean;
  DispensaMedicamentosInsumos: boolean;
  PuedeAlojarPaciente: boolean;
  EsQuirofano: boolean;
  EsSede: boolean;
  ProcedimientoMedicoRegistroEstancia: number;
  EsConsultorio: boolean;
}


