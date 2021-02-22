export class PersonalAsistencialDTO {

   

    nombreCompleto() {
        get:
        {
            return this.nombrePrimer+' '+this.nombreSegundo+' '+this.apellidoPrimer+' '+ this.apellidoSegundo  ;
        }     
    }





    idDTO: string | null;
    documentoNumero: string;
    documentoTipo: string | null;
    nombrePrimer: string;
    nombreSegundo: string;
    apellidoPrimer: string;
    apellidoSegundo: string;
    profesionalNombre: string;
    nombreEspecialidad: string;
    rutaFirmaDigitalizada: string;
    fechaInicialVigencia: string;
    fechaFinalVigencia: string;
    estado: boolean;
    usuarioOphelia: string;
    descripcionTipoDocumento: string;
    foto: string;
}