import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Modo, ModosLed, ModosMotor } from '../interfaces/Modos';
import { DataLocalService } from './data-local.service';
@Injectable({
  providedIn: 'root'
})
export class BluetoohService {

  readonly progress: Observable<string>;

  conectado: number = 0;
  private val = 0;
  lectura = "";
  actualizado: boolean = false;
  modosLedDatosArduino: ModosLed[] = [];
  modoMotorDatosArduino: ModosMotor;
  modoArduino: Modo;

  public g: any[] = [];

  constructor(
    private bluetoothSerial: BluetoothSerial,
    public toastController: ToastController,
    private platform: Platform,
    private localServicio: DataLocalService,

  ) {
    this.initializeApp();


  }

  initializeApp() {

    this.platform.ready().then(() => {
      console.log("initializeApp blue");
       // this.init('dLed');
 
    });
  }
 conexion():any{
   this.bluetoothSerial.isConnected()
   .then(c=>{return this.conectado= 1;})
   .catch(_=>{return this.conectado= 0;})

  }
compruebaConexion(){
  const intervalConexion = setInterval(_=>{
   this.conectado =  this.conexion();console.log(this.conectado);
  },1000)
}

init2(){
  console.log("init2");
  const intervalconexion = setInterval(async () => {
    this.val++;
    if (this.val >= 6) {
      this.conectado=0;
      this.presentToast("No ha conexión", "danger");
      clearInterval(intervalconexion);
    }
    if ( this.conectado){clearInterval(intervalconexion);return;}
    console.log("connect");
    this.bluetoothSerial.connect('98:D3:32:70:7C:95').subscribe(
      res => {
         this.conectado = 1;
        //  this.compruebaConexion();
         clearInterval(intervalconexion);
         this.presentToast("Conectado a Nancy","succes");
       },
      err => {
        this.conectado = 0;
          console.log(err);
      }
    );
  },1000);

}

  init(datos: string) {
    this.val = 0;
    this.conectado = 0;
    // this.actualizado = false;
    const interval = setInterval(async () => {
      this.val++;
      console.log("datos " + datos + this.val);
      if ( this.conectado===3)clearInterval(interval);
   //  if (this.bluetoothSerial.isConnected()&& this.conectado === 0){this.conectado=1;}
      if (this.conectado === 0) {
        console.log("conecta 0");
        if (this.val === 6) {
          this.presentToast("No ha conexión", "danger")
          clearInterval(interval);
        }
        this.bluetoothSerial.connect('98:D3:32:70:7C:95').subscribe(
          res => {
             this.conectado = 1;
             if (this.actualizado){
               this.conectado=3;
              // this.compruebaConexion();
             }
           },
          err => {
            this.conectado = 0;
            //  console.log(err);
          }
        );
      }
      else if (this.conectado === 1 && !this.actualizado) {
        this.conectado = 2;
        console.log("envio" + datos);

        await this.bluetoothSerial.write(datos + "*");
      }
      else if (this.conectado === 2 ) {
        await this.available(datos);
        if (this.modosLedDatosArduino.length && datos === "dLed") {
          //console.log("modosLedDatosArduino");
          this.init("dMotor");
          this.conectado = 1;
          clearInterval(interval);
        }
        else if (    datos === "dMotor") {
          // console.log("dMotor ");
          this.init("dModo");
          this.conectado = 1;
          clearInterval(interval);
        }
        else if (this.modosLedDatosArduino.length && datos === "dModo") {
          // console.log("dModo ");
          this.conectado = 3;
          this.actualizado = true;
          this.presentToast("Actualizado desde Nancy", "success")
          this.conicidenciasLocalArduino();
          clearInterval(interval);
          this.compruebaConexion();

        }

      }
    }, 500);

  }

  async available(datos: string) {
    await this.bluetoothSerial.available().then(async f => {
      //console.log(f);
      let dato = await this.bluetoothSerial.readUntil('*');
      //   console.log(this.d.split("datos*")[0]);
      if (dato) {
        // console.log("hay algo");
        dato = dato.split("*")[0];
        console.log(dato);
        if (datos === "dLed") {
          this.modosLedDatosArduino = JSON.parse(dato);
          dato = "";
          console.log(this.modosLedDatosArduino);
        }
        else if (datos === "dMotor") {
          this.modoMotorDatosArduino = JSON.parse(dato);
          dato = "";
          console.log(this.modoMotorDatosArduino);
        }
        else if (datos === "dModo") {
          this.modoArduino = JSON.parse(dato);
          dato = "";
          console.log(this.modoArduino);
        }


        return;
      } else {
        console.log("Nohay nada");
        this.conectado = 1
        return;
      }
    });
  }

  conicidenciasLocalArduino() {
    const interv = setInterval(async () => {
      if (this.actualizado && this.localServicio.actualizado) {
        console.log("actualizado todo");
        for (let i = 0; i < this.modosLedDatosArduino.length; i++) {
          let f: {};
          let r;
          for (let d in this.modosLedDatosArduino[i]) {
            if (this.modosLedDatosArduino[i][d] === this.localServicio.modosLedDatosLocal[i][d]) {
              r = { [d]: true };
            } else { r = { [d]: false }; }
            f = Object.assign(r, f);
          }
          this.g.push(f)
        }
        console.log(this.g);
        clearInterval(interv);
      }
    }, 1000);
  }
  deviceConnected() {
    this.bluetoothSerial.isConnected().then(success => {
      console.log('isEnabled ', this.bluetoothSerial.isEnabled());
      alert('Connected Successfullly');
    }, error => {
      alert('error' + JSON.stringify(error));
    });
  }
  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: "middle",
      color,
      cssClass: "ion-text-center"

    });
    toast.present();
  }
}
