import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { BluetoohService } from 'src/app/servicios/bluetooh.service';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { Animation } from '@ionic/core';

@Component({
  selector: 'app-modo5',
  templateUrl: './modo5.page.html',
  styleUrls: ['./modo5.page.scss'],
})
export class Modo5Page implements OnInit {

  color:string="rgb(78,90,56)";
  estadoBlue: number = 0;

  // editaConfi: boolean = false;

  // editaIntensidad: boolean = false;
  // editaRetardo: boolean = false;

  negro : HTMLElement;

  constructor(
    private bluetoothSerial: BluetoothSerial,
    public toastController: ToastController,
    public localServicio: DataLocalService,
    public blueServicio: BluetoohService,
    private alertControlador: AlertController,
  ) {

    this.compruebaConexion();
  }
 ngOnInit() {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.
  // this.negro.style.fill="rgb(90,34,23)";

 }

  compruebaConexion(){
    const intervalConexion = setInterval(_=>{
      this.estadoBlue= this.blueServicio.conexion();
    },1000)
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.localServicio.estado.pagina="/modo4";this.localServicio.guardaEstadoLocal();
  }
  blueConecta() {
    // this.blueServicio.init("dLed");
    //this.getDatosblue();
    if ( this.blueServicio.conectado===0){
      this.blueServicio.init2();
    }
  }
  editaModo() {
    console.log("edita");
    this.localServicio.confi[4].editaConfi = !this.localServicio.confi[4].editaConfi;
    this.localServicio.guardaConfiLocal();
  }
  editaIntensidad(index:number){
    console.log("Int");
this.localServicio.confi[index].editaIntensidad=!this.localServicio.confi[index].editaIntensidad;
this.localServicio.guardaConfiLocal();
  }
  editaRetardo(index:number){
    this.localServicio.confi[index].editaRetardo=!this.localServicio.confi[index].editaRetardo;
    this.localServicio.guardaConfiLocal();
  }
  actualizaArduino(cambio: string) {

    let envio: string;
      
      //{"tipo":0,"intensidadMin":10,"delayLed":35,"valRojo":255,"valVerde":255,"valAzul":255}
      envio = cambio + " " +
        5 + " " +
        this.localServicio.modosLedDatosLocal[4].intensidadMax + " " +
        this.localServicio.modosLedDatosLocal[4].intensidadMin + " " +
        this.localServicio.modosLedDatosLocal[4].maxDelay + "*";
   

    this.bluetoothSerial.isConnected().then(_ => {
      this.bluetoothSerial.write(envio).then(s => {
        this.bluetoothSerial.available().then(async f => {
          this.bluetoothSerial.read().then(dato => {
             if (cambio === "Disco") {
              this.localServicio.modoLocal.modo=4;
              console.log(envio);
              console.log(this.localServicio.modoLocal.modo,this.localServicio.modosLedDatosLocal[4]);
             this.localServicio.guardaLedModoLocal();this.localServicio.guardaLedLocal();
            }
            console.log("recibe " + dato);
          }).catch(eeee => {
            console.log("eeee", eeee);
          });
        })
      })
    }).catch(e => {
      this.presentToast("No conectado", "danger");
      this.localServicio.modoLocal.modo=4;
      console.log(envio);
      console.log(this.localServicio.modoLocal.modo,this.localServicio.modosLedDatosLocal[4]);
     this.localServicio.guardaLedModoLocal();this.localServicio.guardaLedLocal();
      console.log("e", e);
    })


  }
  cambioIntensidad(event: any) {
    //  console.log(event);
      this.localServicio.modosLedDatosLocal[4].intensidadMax= event.detail.value.upper;
      this.localServicio.modosLedDatosLocal[4].intensidadMin = event.detail.value.lower;
      this.localServicio.guardaLedLocal();
    }

    cambioRetardo(event: any) {
      console.log(event);
      this.localServicio.modosLedDatosLocal[4].maxDelay = event.detail.value;
      this.localServicio.guardaLedLocal();
  
    }
  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: "middle",
      color,
      cssClass: "ion-text-center"
    });
    toast.present();
  }
}
