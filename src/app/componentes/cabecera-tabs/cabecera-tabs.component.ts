import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
  import { BluetoohService } from 'src/app/servicios/bluetooh.service';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { ModosLed } from '../../interfaces/Modos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera-tabs',
  templateUrl: './cabecera-tabs.component.html',
  styleUrls: ['./cabecera-tabs.component.scss'],
})

export class CabeceraTabsComponent implements OnInit {

  nombreModo: string[] = [
    "Rojo",
    "Verde",
    "Azul",
    "RGB",
    "Disco"
  ]
  //color:string="red"
  srcBlue: string[] = [
    "../../../assets/img/bluetooth-outline0.svg",
    // "../../../assets/img/bluetooth-outline1.svg",
    "../../../assets/img/bluetooth-outline2.svg",
    // "../../../assets/img/bluetooth-outline3.svg"
  ]
  @Input() titulo: number;
  @Input() estadoBlue: number;
  @Output() blueConecta = new EventEmitter();
  @Input() color: string;


  // 
  // arribaAbajo: number = 0;

  constructor(
    public blueServicio: BluetoohService,
    public localServicio: DataLocalService,
    private router: Router
  ) {
   
  }
  //  delay:number=0;
ngOnInit() {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.luceLed(); 
}
  async luceLed() {
    let arribaAbajo:boolean=false;
    let rojo=0;
    let verde=0;
    let azul=0;
    let valF=0;
    let maxDelay =  await this.localServicio.modosLedDatosLocal[4].maxDelay;
    let modo =await this.localServicio.modoLocal.modo ;
    let delay;
    if (modo!==4) {delay= await this.localServicio.modosLedDatosLocal[modo].delayLed;}
    else { delay=this.getRandomInt(500,maxDelay);}
    let tipo = await this.localServicio.modosLedDatosLocal[modo].tipo;

  //  console.log("luceLed "+delay,modo);
    const interval = setInterval(_ => {
 
      
     // console.log('Forma 1', new Date().getTime());

    let modoled=this.localServicio.modoLocal.modo ;
    let delayLed=this.localServicio.modosLedDatosLocal[modo].delayLed ;
    let tipoLed= this.localServicio.modosLedDatosLocal[modo].tipo;

    if ( modoled!==modo){console.log("Modo"); this.color =`rgb(0,0,0)`; clearInterval(interval);this.luceLed();return;}
    if (delayLed!==delay && modoled!==4){console.log("delay"); this.color =`rgb(0,0,0)`; clearInterval(interval);this.luceLed();return;}
    if (tipoLed!==tipo){console.log("tipo");  clearInterval(interval);this.luceLed();return;}

     modo = modoled;
        if (modoled=== 0 || modoled === 1 || modoled === 2) {
          // console.log("object");
          // if ( this.localServicio.modosLedDatosLocal[modoled].tipo===1){
            
          // }
           delay = this.localServicio.modosLedDatosLocal[modoled].delayLed;
          let maxInt=this.localServicio.modosLedDatosLocal[modoled].intensidadMax;
          let minInt=this.localServicio.modosLedDatosLocal[modoled].intensidadMin;
        if (arribaAbajo === true) { //sube
        //  console.log("tipo",tipo);
          
          if (modoled === 0 ){verde=0;azul=0;if ( tipo){rojo = maxInt; this.color = `rgb(${rojo},${verde},${azul})`;return;}
            if (minInt>rojo){ rojo=minInt;}if ( rojo >= maxInt ){ arribaAbajo = !arribaAbajo; } else { rojo = rojo +1; }}
          if (modoled === 1 ){azul=0;rojo=0;if ( tipo){verde = maxInt; this.color = `rgb(${rojo},${verde},${azul})`;return;}
            if (minInt>verde){ verde=minInt;}if ( verde >= maxInt ){ arribaAbajo = !arribaAbajo; } else { verde = verde +1; }}
          if (modoled === 2 ){rojo=0;verde=0;if ( tipo){azul = maxInt; this.color = `rgb(${rojo},${verde},${azul})`;return;}
            if (minInt>azul){ azul=minInt;}if ( azul >= maxInt ){ arribaAbajo = !arribaAbajo; } else { azul = azul +1; }}

        }
        else if ( arribaAbajo=== false) {
     //    if (maxInt<rojo) rojo=maxInt;

          if (modoled === 0 ){verde=0;azul=0;if ( rojo <= minInt ){ arribaAbajo = !arribaAbajo; } else { rojo = rojo -1; }}
          if (modoled === 1 ){azul=0;rojo=0;if ( verde <= minInt ){ arribaAbajo = !arribaAbajo; } else { verde = verde -1; }}
          if (modoled === 2 ){verde=0;rojo=0;if ( azul <= minInt ){ arribaAbajo = !arribaAbajo; } else { azul = azul -1; }}
        }
      }
      else if (this.localServicio.modoLocal.modo === 3) {
        delay = this.localServicio.modosLedDatosLocal[modoled].delayLed;
        let minInt=this.localServicio.modosLedDatosLocal[modoled].intensidadMin;
        rojo=(this.localServicio.modosLedDatosLocal[modoled].valRojo*valF)/100;
        verde=(this.localServicio.modosLedDatosLocal[modoled].valVerde*valF)/100;
        azul=(this.localServicio.modosLedDatosLocal[modoled].valAzul*valF)/100;
        //console.log("tipo",tipo,rojo,verde,azul); 
        if (arribaAbajo === true) {
          if ( tipo===1){
          rojo=this.localServicio.modosLedDatosLocal[modoled].valRojo;
          verde=this.localServicio.modosLedDatosLocal[modoled].valVerde;
          azul=this.localServicio.modosLedDatosLocal[modoled].valAzul;
          this.color = `rgb(${rojo},${verde},${azul})`;
         // console.log("tipo",tipo,rojo,verde,azul); 
          return;
        }
         if ( valF>=100){arribaAbajo=!arribaAbajo;}else{valF++}
        }
        else {
         // console.log("rojo",rojo);

          if ( valF<=minInt){arribaAbajo=!arribaAbajo;}else{valF--}

        }
      }
      else if (this.localServicio.modoLocal.modo === 4) {
     //   if ( valF<=0){arribaAbajo=!arribaAbajo;}else{valF--}
       rojo = this.getRandomInt(0, 255);
       verde = this.getRandomInt(0,255);
      azul = this.getRandomInt(0,255);  
      this.color = `rgb(${rojo},${verde},${azul})`;
      maxDelay = this.getRandomInt(500,this.localServicio.modosLedDatosLocal[4].maxDelay);//
      
  // console.log(delay);
   clearInterval(interval);this.luceLed();
      }
      // console.log("rojo",rojo);
    // console.log("delay ",this.delay);
      // let r = this.getRandomInt(0, 255);
      // let g = 0;//this.getRandomInt(0,255);
      // let b = 0//this.getRandomInt(0,255);  
      this.color = `rgb(${rojo},${verde},${azul})`;
    }, delay)
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  srcSinc: string[] = [
    // "../../../assets/img/sync-circle-outline0.svg",
    "../../../assets/img/sync-circle-outline1.svg",
    // "../../../assets/img/sync-circle-outline1.svg",
    "../../../assets/img/sync-circle-outline2.svg"
  ]
  onClick(){
    console.log("object");
    this.router
    .navigateByUrl("/tuto", { replaceUrl: true })
  }
   blue() {
    this.blueConecta.emit();

    //this.blueServicio.conecta2("dLed");
  }
  actualizaArduino(motor:string) {
    window.location.assign('/');
    }
}
