import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Modo, ModosLed, ModosMotor } from 'src/app/interfaces/Modos';
import { BluetoohService } from 'src/app/servicios/bluetooh.service';
import { DataLocalService } from 'src/app/servicios/data-local.service';

@Component({
  selector: 'app-modo13',
  templateUrl: './modo13.page.html',
  styleUrls: ['./modo13.page.scss'],
})
export class Modo13Page {
  modosLedDatosArduino: ModosLed[] = [];
  modoMotorDatosArduino: ModosMotor;
  modoArduino: Modo;

  modosLedDatosLocal: ModosLed[] = [];
  modoMotorDatosLocal: ModosMotor;
  modoLocal: Modo;

  estadoBlue: number = 0;
  private val: number = 0;
color:string="rgb(78,90,56)";

  //editaConfi: boolean[] = [false, false, false];///ffff


  constructor(
    public localServicio: DataLocalService,
      public blueServicio: BluetoohService,
    
    public toastController: ToastController,
    private platform: Platform,

  ) {
    this.initializeApp();
 
    //       setInterval(async () => {
    // // this.editaConfi= !this.editaConfi;
    // console.log("modosLedDatosLocal[0].tipo " ,this.modosLedDatosLocal[0].tipo);
    //     },1000)
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      console.log("initializeApp tab1");
//   this.getDatosblue();
   this.getDatosLocal();
   this.compruebaConexion();
    });
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.localServicio.estado.pagina="/modo13";this.localServicio.guardaEstadoLocal();
  }
  blueConecta(){
    //this.blueServicio.init("dLed");
  //  this.getDatosblue();
  if ( this.blueServicio.conectado===0){
    this.blueServicio.init2();
  }

  }

  compruebaConexion(){
    console.log("comprueba");
    const intervalConexion = setInterval(_=>{
      this.estadoBlue= this.blueServicio.conexion();
    },1000)
  }
  ///////////////////////////////////////////////////////////////////////
  
  async getDatosLocal() {
    const intervalDatosArdu = setInterval(async () => {

      if (this.localServicio.actualizado) {
        for (let a = 0; a <= 2; a++) {
          await this.modosLedDatosLocal.push(this.localServicio.modosLedDatosLocal[a]);
        }
        this.modoMotorDatosLocal = this.localServicio.modoMotorDatosLocal;
        this.modoLocal = this.localServicio.modoLocal;
        console.log("hay datos en local", this.modosLedDatosLocal);
        clearInterval(intervalDatosArdu);
      } else {
        console.log("No hay datos en local");
      }
    }, 100);
  }


  // async getDatosblue() {
  //   this.val = 0;
  //   const intervalDatosBlue = setInterval(async () => {
  //    // if (this.blueServicio.actualizado) return;

  //     this.estadoBlue = this.blueServicio.conectado;
  //     this.val++;
  //     if (this.val === 12) {
  //       //this.presentToast("No ha conexión");
  //       clearInterval(intervalDatosBlue);
  //     }
  //     console.log("buscando actualizacion");
  //     if (this.blueServicio.actualizado) {
  //       for (let a = 0; a <= 2; a++) {
  //         await this.modosLedDatosArduino.push(this.blueServicio.modosLedDatosArduino[a]);
  //       }
  //       this.modoMotorDatosArduino = this.blueServicio.modoMotorDatosArduino;
  //       this.modoArduino = this.blueServicio.modoArduino;
  //       console.log("tab1 actualizado desde arduino ", this.modosLedDatosArduino);
  //       //  this.presentToast("Actualizado desde nancy");
  //       clearInterval(intervalDatosBlue);
  //     }
  //   }, 1000);
  // }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: "middle",
      color: "danger",
      cssClass: "ion-text-center"
    });
    toast.present();
  }

  /////////////////////////////////////////////////////////////////////
  edita(i: number) {
    this.localServicio.confi[i].editaConfi=!this.localServicio.confi[i].editaConfi;
    this.localServicio.guardaConfiLocal();
    // this.editaConfi[i] = !this.editaConfi[i];
    // console.log(this.editaConfi);
  }

  ///////////////////////////////////////////////////////////////////////

  cambio() {
    console.log("cambio");
  }


}
