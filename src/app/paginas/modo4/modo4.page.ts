import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { ColorHueModule } from 'ngx-color/hue';
import { BluetoohService } from 'src/app/servicios/bluetooh.service';
import { DataLocalService } from 'src/app/servicios/data-local.service';

@Component({
  selector: 'app-modo4',
  templateUrl: './modo4.page.html',
  styleUrls: ['./modo4.page.scss'],
})
export class Modo4Page implements OnInit {
  color:string;
  state: any = { r: 251, g: 51, b: 51 }
  srcBlue: string[] = [
    "../../../assets/img/bluetooth-outline0.svg",
    "../../../assets/img/bluetooth-outline1.svg",
    "../../../assets/img/bluetooth-outline2.svg",
    "../../../assets/img/bluetooth-outline3.svg"
  ]
  srcSinc: string[] = [
    "../../../assets/img/sync-circle-outline0.svg",
    "../../../assets/img/sync-circle-outline1.svg",
    "../../../assets/img/sync-circle-outline1.svg",
    "../../../assets/img/sync-circle-outline2.svg"
  ]

  // editaConfi: boolean = false;
  // editaRetardo: boolean = false;
  // editaIntsidad: boolean = false;

  estadoBlue: number = 0;

  constructor(
    private bluetoothSerial: BluetoothSerial,
    public toastController: ToastController,
    private localServicio: DataLocalService,
    public blueServicio: BluetoohService,
    private alertControlador: AlertController,

    private colorHue: ColorHueModule,
    
  ) { }
 async ngOnInit(){
   console.log("modo4");
   this.color=`rgb(${  this.localServicio.modosLedDatosLocal[3].valRojo},
    ${  this.localServicio.modosLedDatosLocal[3].valVerde},
    ${  this.localServicio.modosLedDatosLocal[3].valAzul})`
 }
//  ngOnChanges( ): void {
//    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
//    //Add '${implements OnChanges}' to the class.
//    console.log("change");
//  }


ionViewWillEnter(){
  console.log("ionViewWillEnter");
  this.localServicio.estado.pagina="/modo4";this.localServicio.guardaEstadoLocal();
}
  compruebaConexion(){
    const intervalConexion = setInterval(_=>{
      console.log(this.color);
      this.estadoBlue= this.blueServicio.conexion();
    },1000)
  }
  changeComplete(event: any) {
    //event.preventDefault();
    if (event.cancelable) {
      event.preventDefault();
    }
    //console.log("change", event.color.rgb);
    this.localServicio.modosLedDatosLocal[3].valRojo = event.color.rgb.r;
    this.localServicio.modosLedDatosLocal[3].valVerde = event.color.rgb.g;
    this.localServicio.modosLedDatosLocal[3].valAzul = event.color.rgb.b;
    this.localServicio.guardaLedLocal();

    console.log(this.localServicio.modosLedDatosLocal[3].valRojo, this.localServicio.modosLedDatosLocal[3].valVerde, this.localServicio.modosLedDatosLocal[3].valAzul);
  }

 


  async alertTipo(index: number) {
    //console.log("tipo ", this.tipo);
    let fijoChecked, variableChecked: boolean = false;
    if (this.localServicio.modosLedDatosLocal[index].tipo === 1) { fijoChecked = true; variableChecked = false; }
    else { fijoChecked = false; variableChecked = true; }
    // console.log(this.tipo,fijoChecked,variableChecked);
    const alert = await this.alertControlador.create({
      header: 'Tipo modo',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'fijo',
          value: [1, "fijo"],
          checked: fijoChecked
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'variable',
          value: [0, "variable"],
          checked: variableChecked

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data: any) => {
            console.log('Confirm Cancel', data);

          }
        }, {
          text: 'Ok',
          handler: (data: any) => {
            // this.tipo = data[0];
            this.localServicio.modosLedDatosLocal[index].tipo = data[0];
            this.localServicio.guardaLedLocal();
            console.log('Confirm Ok', data);
          }
        }
      ]
    });
    await alert.present();


    //this.tipoCambio.emit([this.index, this.tipo])
  }

  editaModo() {
    console.log("edita");
    this.localServicio.confi[3].editaConfi = !this.localServicio.confi[3].editaConfi;
    this.localServicio.guardaConfiLocal();
    // this.edita.emit()
  }
  editaIntensidad(event:any, index:number){
    this.localServicio.confi[3].editaIntensidad=!this.localServicio.confi[3].editaIntensidad;
    this.localServicio.guardaConfiLocal();
  }
  editaRetardo(){
    this.localServicio.confi[3].editaRetardo=!this.localServicio.confi[3].editaRetardo;
    this.localServicio.guardaConfiLocal();
  }

  cambioRetardo(event: any, index: number) {
    console.log(event);
    this.localServicio.modosLedDatosLocal[index].delayLed = event.detail.value;
    this.localServicio.guardaLedLocal();

  }
  cambioIntensidadMin(event: any, index: number) {
    console.log(event);
    this.localServicio.modosLedDatosLocal[index].intensidadMin = event.detail.value;
    this.localServicio.guardaLedLocal();

  }
  actualizaArduino(cambio: string) {

    let envio: string;
      
      //{"tipo":0,"intensidadMin":10,"delayLed":35,"valRojo":255,"valVerde":255,"valAzul":255}
      envio = cambio + " " +
        4 + " " +
        this.localServicio.modosLedDatosLocal[3].tipo + " " +
        this.localServicio.modosLedDatosLocal[3].intensidadMin + " " +
        this.localServicio.modosLedDatosLocal[3].delayLed + " " +
        this.localServicio.modosLedDatosLocal[3].valRojo + " " +
        this.localServicio.modosLedDatosLocal[3].valVerde + " " +
        this.localServicio.modosLedDatosLocal[3].valAzul + "*";
   

    this.bluetoothSerial.isConnected().then(_ => {
      this.bluetoothSerial.write(envio).then(s => {
        this.bluetoothSerial.available().then(async f => {
          this.bluetoothSerial.read().then(dato => {
             if (cambio === "RGB") {
              this.localServicio.modoLocal.modo=3;
              console.log(envio);
              console.log(this.localServicio.modoLocal.modo,this.localServicio.modosLedDatosLocal[3]);
             this.localServicio.guardaLedModoLocal();this.localServicio.guardaLedLocal();
            }
            console.log("recibe " + dato);
          }).catch(eeee => {
            console.log("eeee", eeee);
          });
        })
      })
    }).catch(e => {
      this.presentToast("No conectado", "danger")
      this.localServicio.modoLocal.modo=3;
      console.log(envio);
      console.log(this.localServicio.modoLocal.modo,this.localServicio.modosLedDatosLocal[3]);
      this.localServicio.guardaLedModoLocal();this.localServicio.guardaLedLocal();
      console.log("e", e);
    })


  }

  blueConecta() {
    // this.blueServicio.init("dLed");
    //this.getDatosblue();
    if ( this.blueServicio.conectado===0){
      this.blueServicio.init2();
    }
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
