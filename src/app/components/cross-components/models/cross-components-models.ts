export class DiagnosisRegisterDTO {
    TipoDiagRegistroMedico: DiagnosisTypeDTO;
    Diagnostico: DiagnosisDTO;
    DiagnosticoPrincipal: string;
    ObservacionEspecificacion: string;
    Programa: PYDProgramDTO;
    InscribirPrograma: boolean;
  }
  
  export class PYDProgramDTO {
    idDTO: string;
    DescripcionDTO: string;
    EstadoDTO?: string;
  }

  export class DiagnosisDTO{
    codigo: string;
    descripcionDTO: string;
    estadoDTO: boolean;
    idDTO: string;
  }

  export class DiagnosisTypeDTO{
    idDTO: string;
    DescripcionDTO: string;
    EstadoDTO: boolean;
  }