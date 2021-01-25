export class GetAppointmentIndividualtytiDTO{
    id:string;
    fecha:string;
    hora:string;
    sede:string;
    consultorio:string;
    profesional:string;
    especialidad:string;
    procedimiento:string;
}

export class AppointmentPerIdDTO{
    idDTO:string;
    fechaDTO:string;
    horaDTO:string;
    sedeDTO:string;
    consultorioDTO:string;
    tipoCItaDTO:string;
    especialidadDTO:string;
    procedimientoDTO:string;
    profesionalDTO:string;
}

export class CitaDTO{
    id:string; 
    fechaCita:string;
    horaCita:string;
    detalleProcedimientoAgenda:string; 
    instalacionPrestador:string;
    tipoCita:string;
    autorizacionAsegurador:string;
    persona:string;
    idProfesional:string;
    especialidadMedica:string;
    opheliaUser:string;
}