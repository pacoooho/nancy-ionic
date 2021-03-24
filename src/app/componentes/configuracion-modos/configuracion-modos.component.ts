import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Modo, ModosLed, ModosMotor } from 'src/app/interfaces/Modos';
import { DataLocalService } from 'src/app/servicios/data-local.service';
@Component({
  selector: 'app-configuracion-modos',
  templateUrl: './configuracion-modos.component.html',
  styleUrls: ['./configuracion-modos.component.scss'],
})
export class ConfiguracionModosComponent implements OnInit {

  @Input() modosLedDatosLocal: ModosLed[] = [];
  @Input() modoMotorDatosLocal: ModosMotor;
  @Input() modoLocal: Modo;

  // Modo 1,2,3
  @Input() tipo: number;
  @Input() intensidadMax: number;
  @Input() intensidadMin: number;
  @Input() delayLed: number;
  @Input() item: ModosLed;

  @Output() tipoCambio = new EventEmitter<number[]>();

  @Input() editaConfi: boolean;
  @Input() index: number;



  constructor(
    private alertControlador: AlertController,
    public localServicio: DataLocalService,


  ) {
    //     setInterval(async () => {
    // // this.editaConfi= !this.editaConfi;
    // console.log("editaIntensidad " ,this.editaIntensidad);
    //     },1000)
  }

  ngOnInit() { }


  async alertTipo(index: number) {
    //console.log("tipo ", this.tipo);
    let fijoChecked, variableChecked: boolean = false;
    if (this.tipo === 1) { fijoChecked = true; variableChecked = false; }
    else { fijoChecked = false; variableChecked = true; }
    // console.log(this.tipo,fijoChecked,variableChecked);
    const alert = await this.alertControlador.create({
      header: 'Tipo modo',
      cssClass: 'secondary',
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
            this.tipo = data[0];
            this.modosLedDatosLocal[index].tipo = data[0];
            this.localServicio.guardaLedLocal();
            console.log('Confirm Ok', data);
          }
        }
      ]
    });
    await alert.present();


    //this.tipoCambio.emit([this.index, this.tipo])
  }
  private knobValues: Object = {
    upper: 4,
    lower: 18
  }
  editaIntensidad(event: any, index: number) {
    this.localServicio.confi[index].editaIntensidad = !this.localServicio.confi[index].editaIntensidad;
    this.localServicio.guardaConfiLocal();

  }
  editaRetardo(event: any, index: number) {
    this.localServicio.confi[index].editaRetardo = !this.localServicio.confi[index].editaRetardo;
    this.localServicio.guardaConfiLocal();
  }
  cambioIntensidad(event: any, index: number) {
    //  console.log(event);
    this.localServicio.modosLedDatosLocal[index].intensidadMax = this.intensidadMax = event.detail.value.upper;
    this.localServicio.modosLedDatosLocal[index].intensidadMin = this.intensidadMin = event.detail.value.lower;
    this.localServicio.guardaLedLocal();
  }
  cambioRetardo(event: any, index: number) {
    console.log(event);
    this.localServicio.modosLedDatosLocal[index].delayLed = this.delayLed = event.detail.value;
    this.localServicio.guardaLedLocal();

  }
}
