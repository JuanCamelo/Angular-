import { OpcionDispositivoRetiradoEgresoEnfermeriaDTO } from "./OpcionDispositivoRetiradoEgresoEnfermeriaDTO";
import { OpcionDispositivosEgresoEnfermeriaDTO } from "./OpcionDispositivosEgresoEnfermeriaDTO";
import { OpcionEducacionEgresoEnfermeriaDTO } from "./OpcionEducacionEgresoEnfermeriaDTO";
import { OpcionFormaEducacionEgresoEnfermeriaDTO } from "./OpcionFormaEducacionEgresoEnfermeriaDTO";
import { OpcionMedioSalidaEgresoEnfermeriaDTO } from "./OpcionMedioSalidaEgresoEnfermeriaDTO";

export class EgresoEnfermeriaDTO {
    constructor() {
        this.id = '';
        this.registroMedico = '';
        this.personalAsistenciaRegistra = '';
        this.fechaHoraRegistro = new Date();
        this.condicionEgreso = '';
        this.otraCondicionEgreso = '';
        this.dispositivosRetirados = [];
        this.otroDispositivoRetirado = '';
        this.observacionDispositivosRetirados = '';
        this.dispositivosEgresoEnfermeria= [];
        this.otroDispositivo = '';
        this.observacionOtroDispositivo = '';
        this.educacion=[];
        this.otroEducacion = '';
        this.observacionEducacion = '';
        this.verificacionPertenencias = false;
        this.observacionGeneral = '';
        this.forma=[];
        this.medioSalida=[];
    }

    id: string;
    registroMedico: string;
    personalAsistenciaRegistra: string;
    fechaHoraRegistro: Date;
    condicionEgreso: string | null;
    otraCondicionEgreso: string;
    dispositivosRetirados:OpcionDispositivoRetiradoEgresoEnfermeriaDTO[];
    otroDispositivoRetirado: string;
    observacionDispositivosRetirados: string;
    dispositivosEgresoEnfermeria:OpcionDispositivosEgresoEnfermeriaDTO[];
    otroDispositivo: string;
    observacionOtroDispositivo: string;
    educacion:OpcionEducacionEgresoEnfermeriaDTO[];
    otroEducacion: string;
    observacionEducacion: string;
    verificacionPertenencias: boolean | null;
    observacionGeneral: string;
    forma:OpcionFormaEducacionEgresoEnfermeriaDTO[];
    medioSalida:OpcionMedioSalidaEgresoEnfermeriaDTO[];
}