import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Confi, Modo, ModosLed, ModosMotor, Estado } from '../interfaces/Modos';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private modosLedPredefinido = [{ "tipo": 0, "intensidadMax": 155, "intensidadMin": 10, "delayLed": 35 }, { "tipo": 0, "intensidadMax": 155, "intensidadMin": 10, "delayLed": 35 }, { "tipo": 0, "intensidadMax": 155, "intensidadMin": 10, "delayLed": 35 }, { "tipo": 0, "intensidadMin": 10, "delayLed": 35, "valRojo": 255, "valVerde": 255, "valAzul": 255 }, { "intensidadMax": 155, "intensidadMin": 10, "maxDelay": 1000 }];
  private modosMotorPredefinido = { "motor": 2, "voltajeMotor": 100, "retardoMotor": 10 };
  private modoPredefinido = { "modo": 1 };

  private confiPredefinido=[{"editaConfi":false,"editaIntensidad":false,"editaRetardo":false},{"editaConfi":true,"editaIntensidad":true,"editaRetardo":true},{"editaConfi":true,"editaIntensidad":true,"editaRetardo":true},
  {"editaConfi":true,"editaIntensidad":true,"editaRetardo":true},{"editaConfi":true,"editaIntensidad":true,"editaRetardo":true}]
  
  private estadoPredefinido={"pagina":"/modo13"};

  modosLedDatosLocal: ModosLed[] = [];
  modoMotorDatosLocal: ModosMotor;
  modoLocal: Modo;
  actualizado: boolean = false;

  confi: Confi[]=[];
estado:Estado;

  constructor(
    private storage: Storage,
    private platform: Platform,

  ) {
    this.init();
    this.initializeApp();

  //  this.init();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      console.log("initializeApp local");
     

 
    });
  } 

  async init() {
    await this.storage.create();
    // await this.storage.remove('dLed');
    // await this.storage.remove('dMotor');
    // await this.storage.remove('dModo');
    // await this.storage.remove('confi');
    // await this.storage.remove('estado');


    const data = await this.storage.get('dLed');
    console.log("init",data);

    if (data === null) {
      console.log("No data grabada");
      await this.storage.set("dLed", this.modosLedPredefinido);
      this.modosLedDatosLocal = this.modosLedPredefinido;

      await this.storage.set("dMotor", this.modosMotorPredefinido);
      this.modoMotorDatosLocal = this.modosMotorPredefinido;

      await this.storage.set("dModo", this.modoPredefinido);
      this.modoLocal = this.modoPredefinido;

      await this.storage.set("confi", this.confiPredefinido);
      this.confi = this.confiPredefinido;

      await this.storage.set("estado", this.estadoPredefinido);
      this.estado = this.estadoPredefinido;

      this.actualizado= true;

      console.log("data");
    } else {
      console.log("Si data recuperando");
      this.modosLedDatosLocal = await this.storage.get('dLed');
      this.modoMotorDatosLocal = await this.storage.get('dMotor');
      this.modoLocal = await this.storage.get('dModo');
      this.confi= await this.storage.get('confi');
      this.estado= await this.storage.get('estado');

      console.log("led ", this.modosLedDatosLocal);
      console.log("Motor ", this.modoMotorDatosLocal);
      console.log("modo ", this.modoLocal);
      console.log("confi ", this.confi);
      console.log("confi ", this.estado);

      this.actualizado= true;


    }
  }
  guardaLedLocal(){
    this.storage.set("dLed",this.modosLedDatosLocal);
  }
  guardaMotorLocal(){
    this.storage.set("dMotor",this.modoMotorDatosLocal);
  }  
  guardaLedModoLocal(){
    this.storage.set("dModo",this.modoLocal);
  }
  guardaConfiLocal(){
    this.storage.set("confi",this.confi);
  }
  guardaEstadoLocal(){
    this.storage.set("estado",this.estado);
  }
}
