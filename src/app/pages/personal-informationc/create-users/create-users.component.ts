import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oph-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  bedSelectModalVisibleCreate = true;
  img = "assets/images/userAvatar.png";
  valid = false
  isDropZoneActive = false;
  imageSource = "";
  textVisible = true;
  progressVisible = false;
  progressValue = 0;

  filas = [];
  columnas = [];

  constructor() {
    this.llenarAleatorio();
  }

  llenarAleatorio() {
    // entre 1 y 10
    let totalColumnas = Math.floor(Math.random() * 10 + 1);

    // crear las columnas
    for (let i = 0; i < totalColumnas; i++) {
      this.columnas.push(i);
    }

    //crear las filas entre 1 y 10
    let totalFilas = 10;

    for (let i = 0; i < totalFilas; i++) {
      let fila = [];

      for (let i = 0; i < totalColumnas; i++) {
        fila[i] = {
          valor: "",
          editar: false
        };
      }
      this.filas.push(fila);
    }
  }

  ocultarCeldas(celda) {
    console.log(celda)
    celda.editar = true;
    this.filas.forEach(f => {
      f.forEach(c => {
        if (c != celda) c.editar = false;
      });
    });
  }


  

















  public FormRequests ={
    primerNombre:'',
    segundoNombre:'',
    primerApellido:'',
    segundoApellido:'',
    fechaNacimiento:'',
    correElectronico:'',
    tipoDoc:'',
    numeroDocumento:'',
    pais:'',
    departamento:'',
    cuidad:'',
    telefono:''
  }
  // constructor() {
   
  //  }
  updateClick(){

  }
  
  onDropZoneEnter(e) {
    console.log(e)
    if(e.dropZoneElement.id === "dropzone-external")
        this.isDropZoneActive = true;
}

onDropZoneLeave(e) {
  console.log(e,"juan pasa asd")
    if(e.dropZoneElement.id === "dropzone-external")
        this.isDropZoneActive = false;
}

onUploaded(e) {
  console.log(e,"onUploaded dfgsfdfgfgfdgsdf")
    const file = e.file;
    const fileReader = new FileReader();
    fileReader.onload = () => {
        this.isDropZoneActive = false;
        this.imageSource = fileReader.result as string;
    }
    fileReader.readAsDataURL(file);
    this.textVisible = false;
    this.progressVisible = false;
    this.progressValue = 0;
}

onProgress(e) {
  console.log(e)
    this.progressValue = e.bytesLoaded / e.bytesTotal * 100;
}

onUploadStarted(e) {
  console.log(e)
    this.imageSource = "";
    this.progressVisible = true;
}

  ngOnInit() {

  }

}
