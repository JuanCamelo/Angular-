export class MedicalAdministrationDTO {
    IdDTO?: number;
    IdNumeroOrdenMedicaDTO: number;
    EstadoDTO: string;
    FechaFormulaDTO: Date;
    MedicamentoDTO: string;
    ConcentracionDTO: string;
    ConcentracionDescripcionDTO: string;
    DosisDTO: string;
    DosisDescripcionDTO: string;
    ViaAplicacionDTO: string;
    //goteo?: boolean;
    FrecuenciaDTO: string;
    FrecuenciaDescripcionDTO: string;
    FechaAplicacion?:Date;
    HoraAplicacion?:Date;
    //unidadDeMedida?: string;
    CantidadDTO: number;
    ObservacionDTO: string;
    ObservacionEjecucionDTO: string;
    UnidadInventarioAplicadaDTO: string; 
    UnidadMedidaSuministroAdministradoDTO: string;
    UnidadPresentacionDTO: string;
    GoteroDTO: boolean;
    CantidadGotasDTO: string;
    //fechaAplicacion: Date;

}