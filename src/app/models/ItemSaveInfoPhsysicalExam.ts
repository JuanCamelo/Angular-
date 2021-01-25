export interface ItemSaveInfo {
  id: string,
  descripcion: string,
  /*  value: boolean | string,
   subOpcion: boolean,
   capturaTexto: boolean */
}

export class RegistroMedicoDTO {
  idRegistromedico: string;
  physicalExam: Array<ItemSaveInfo>;
}