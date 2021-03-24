import { Component, ElementRef, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationDirection, IonSlides, MenuController, Platform } from '@ionic/angular';
import { createAnimation, Animation } from '@ionic/core';
import { RGB } from 'ngx-color';
import { TimeInterval } from 'rxjs';
import { DataLocalService } from '../../servicios/data-local.service';
import { ModosLed } from '../../interfaces/Modos';

@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.page.html',
  styleUrls: ['./tuto.page.scss'],
})
export class TutoPage implements OnInit {
  showSkip = true;

  @ViewChild('slides', { static: true }) slides: IonSlides;
  @ViewChild('s', { static: true }) s: ElementRef;
  @ViewChild('p') p: ElementRef;

  animacion: Animation = createAnimation();

  constructor(
    //  private bluetoothSerial: BluetoothSerial,
    public menu: MenuController,
    public router: Router,
    private platform: Platform,
    public renderer: Renderer2,
    public localServicio: DataLocalService,
  ) {
    this.initializeApp();

  }

  initializeApp() {

    this.platform.ready().then(() => {
      console.log("initializeApp app");
      const dataLocal = setInterval(_ => {
        const modo = this.localServicio.modoLocal.modo;
        console.log(modo);
        if (modo === undefined) { return; }
        console.log("OK");
        this.modo13();
        // this.modo4();
        this.led(100);
        clearInterval(dataLocal);
      }, 100)
    });
  }
  modo13() {
    const modo = this.localServicio.modoLocal.modo;
    const delayled = this.localServicio.modosLedDatosLocal[modo].delayLed;
    const max = this.localServicio.modosLedDatosLocal[modo].intensidadMax;
    const min = this.localServicio.modosLedDatosLocal[modo].intensidadMin;
    let duracion = delayled * (max - min);

    let colorMax = `rgb(${modo === 0 ? max : 0},${modo === 1 ? max : 0},${modo === 2 ? max : 0})`;
    let colorMin = `rgb(${modo === 0 ? min : 0},${modo === 1 ? min : 0},${modo === 2 ? min : 0})`;
    // console.log("modo13",modo,delayled,max,min,duracion,colorMax,colorMin);
    this.animacion = createAnimation()
      .addElement(document.querySelectorAll(".cabezaLedPath"))
      //.easing("ease-in-out")
      .duration(duracion)
      .direction("alternate")
      .iterations(Infinity)
      .keyframes([
        { offset: 0, fill: colorMax },
        { offset: 1, fill: colorMin }
      ]);

    //this.animacion.play();
  }
  modo4() {
    const modo = this.localServicio.modoLocal.modo;
    let localLedDatos = this.localServicio.modosLedDatosLocal[modo];
    // console.log("modo",modo);
    const delayled = localLedDatos.delayLed;
    const min = localLedDatos.intensidadMin;
    const rojo = localLedDatos.valRojo;
    const verde = localLedDatos.valVerde;
    const azul = localLedDatos.valAzul;

    let duracion = delayled * (100 - min);

    let colorMax = `rgb(${rojo},${verde},${azul})`;
    let colorMin = `rgb(${(rojo / 99).toFixed(0)},${(verde / 99).toFixed(0)},${(azul / 99).toFixed(0)})`;
    // console.log("modo13",modo,delayled,min,duracion,colorMax,colorMin);
    this.animacion = createAnimation()
      .addElement(document.querySelectorAll(".cabezaLedPath"))
      //.easing("ease-in-out")
      .duration(duracion)
      .direction("alternate")
      .iterations(Infinity)
      .keyframes([
        { offset: 0, fill: colorMax },
        { offset: 1, fill: colorMin }
      ]);

    //this.animacion.play();
  }
  led(delay: number) {

    const int = setInterval(_ => {
      let modo = this.localServicio.modoLocal.modo;
      if (modo === undefined) { console.log(modo); return; }
      // if (this.localServicio.modosLedDatosLocal[modo].intensidadMax ===undefined){console.log("localLedDatos");return;}

      // console.log("modo",modo);

      if (modo === 0 || modo === 1 || modo === 2) {
        //console.log("modo12");
        const delayled = this.localServicio.modosLedDatosLocal[modo].delayLed;
        const max = this.localServicio.modosLedDatosLocal[modo].intensidadMax;
        const min = this.localServicio.modosLedDatosLocal[modo].intensidadMin;
        let duracion = delayled * (max - min);//this.modo13();
        // console.log("modo13",delayled,max,min,duracion);
        if (duracion !== this.animacion.getDuration()) {
          this.modo13();
          // console.log("ANIMACION");
          //  return;
          //console.log("ANIMACION");
        }
        this.animacion.play();

      }
      else if (modo === 3) {
        // console.log("modo3");
        const delayled = this.localServicio.modosLedDatosLocal[modo].delayLed;
        const min = this.localServicio.modosLedDatosLocal[modo].intensidadMin;
        let duracion = delayled * (100 - min);//this.modo13();
        if (duracion !== this.animacion.getDuration()) {
          this.modo4();
          //console.log("ANIMACION");
          //  return;

        }
        this.animacion.play();

      }

      else if (modo === 4) {

        const rojo = this.getRandomInt(0, 255);
        const verde = this.getRandomInt(0, 255);
        const azul = this.getRandomInt(0, 255);
        let color = `rgb(${rojo},${verde},${azul})`;
        let del = this.localServicio.modosLedDatosLocal[4].maxDelay;
        let maxDelay = this.getRandomInt(500, del);//
        this.cambioColorPatas(rojo, verde, azul);
        this.cambiColorLed(color);
        // console.log(del);
        clearInterval(int); this.led(maxDelay);
      }
    }, delay)
  }


  ngOnInit() {
    // this.modo13();
    console.log("INIT", window.screen);
    // this.startApp();
    //let direc:AnimationDirection;

    // let d:HTMLElement = document.querySelector(".cabezaLed");
    // console.log("d",d);
    // d.style.transition="all 0.5s ease-out"
    // d.style.transformOrigin="50% 50%";
    //  // d.style.rotate="180deg";
    // //  d.style.transform="rotate(180deg) ";

    //    this.renderer.setStyle(d.childNodes[0], 'fill', 'blue');
    //    this.renderer.setStyle(d.childNodes[1], 'fill', 'blue');
    //    this.renderer.setStyle(d.childNodes[2], 'fill', 'blue');
    //    this.renderer.setStyle(d.childNodes[3], 'fill', 'blue');
    //    this.renderer.setStyle(d.childNodes[4], 'fill', 'blue');
    //    this.renderer.setStyle(d.childNodes[5], 'fill', 'blue');

    // this.luceLed2();
  }
  cambiColorLed(color: string) {
    //console.log(color);
    let d: HTMLElement = document.querySelector(".cabezaLed");

    this.renderer.setStyle(d.childNodes[0], 'fill', color);
    this.renderer.setStyle(d.childNodes[1], 'fill', color);
    this.renderer.setStyle(d.childNodes[2], 'fill', color);
    this.renderer.setStyle(d.childNodes[3], 'fill', color);
    this.renderer.setStyle(d.childNodes[4], 'fill', color);
    this.renderer.setStyle(d.childNodes[5], 'fill', color);

  }
  cambioColorPatas(rojo: number, verde: number, azul: number) {
    //console.log(rojo,verde,azul);
    let r: HTMLElement = document.querySelector(".patasLed");
    this.renderer.setStyle(r.childNodes[3], 'fill', `rgb(${rojo},0,0)`);
    this.renderer.setStyle(r.childNodes[1], 'fill', `rgb(0,${verde},0)`);
    this.renderer.setStyle(r.childNodes[0], 'fill', `rgb(0,0,${azul})`);
  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    // this.localServicio.estado.pagina="/modo13";this.localServicio.guardaEstadoLocal();
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.
  //   console.log("ngOnChanges",changes);
  // }
  startApp() {
    console.log("start");
    const pagina = this.localServicio.estado.pagina;
    console.log(pagina);
    this.router
      .navigateByUrl(pagina, { replaceUrl: true })
    // .then(() => this.storage.set('ion_did_tutorial', true));
    // this.renderer.setStyle(this.s.nativeElement, 'display', 'none');

  }


  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.router
        .navigateByUrl('/modo13', { replaceUrl: true })
      //  this.showSkip = !isEnd;
    });
  }

  // ionViewWillEnter() {
  //   this.storage.get('ion_did_tutorial').then(res => {
  //     if (res === true) {
  //       this.router.navigateByUrl('/tabs/modo13', { replaceUrl: true });
  //     }
  //   });

  //   this.menu.enable(false);
  // }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  animation() {
    const animation11 = createAnimation()
      .addElement(document.querySelectorAll(".cabezaLedPath"))
      //.easing("ease-in-out")
      .duration(1000)
      .direction("alternate")
      .iterations(Infinity)
      .keyframes([
        { offset: 0, fill: "rgb(255,0,0)" },
        { offset: 1, fill: "rgb(0,0,0)" }
      ]);

    //animation1.play();

    const animation2 = createAnimation()
      .addElement(document.querySelector(".estrellaGrande"))
      .iterations(Infinity)

      .duration(2000)
      .beforeStyles({ opacity: 0.2 })
      .afterStyles({ background: 'rgba(0, 255, 0, 0.5)' })
      .afterClearStyles(['opacity'])
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.5)' },
        { offset: 1, transform: 'scale(1)' }
      ]);

    animation2.play();

    const animation3 = createAnimation()
      .addElement(document.querySelector(".led1"))
      .easing("ease-in-out")
      .duration(1000)
      .direction("alternate")
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: "scale(1)", opacity: "1" },
        { offset: 1, transform: "scale(0.5)", opacity: "0.5" }
      ]);

    animation3.play();
    const animation4 = createAnimation()
      .addElement(document.querySelector(".dobleEstrellaA"))
      .iterations(Infinity)
      .duration(1000)
      .direction("alternate")
      .easing("ease-in-out")
      .keyframes([
        { offset: 0, fill: "green" },
        { offset: 1, fill: "blue" }
      ])
    animation4.play();

    const squareA = createAnimation()
      .addElement(document.querySelector('.dobleEstrellaB'))
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(45deg)' }
      ]);

    const squareB = createAnimation()
      .addElement(document.querySelector('.simpleEstrellaA'))
      .keyframes([
        { offset: 0, transform: 'scale(1))', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);

    const squareC = createAnimation()
      .addElement(document.querySelector('.simpleEstrellaB'))
      .fill('none')
      .duration(2000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' }
      ]);

    const parent = createAnimation()
      .duration(2000)
      .iterations(Infinity)
      .addAnimation([squareA, squareB, squareC]);


    parent.play();


  }
  color: string;
  interval2: any;
  async luceLed2() {

    //  console.log("object");
    //clearInterval();
    let arribaAbajo: boolean = false;
    let rojo = 0;
    let verde = 0;
    let azul = 0;
    let valF = 0;
    let maxDelay = this.localServicio.modosLedDatosLocal[4].maxDelay;
    let modo = this.localServicio.modoLocal.modo;
    let delay1;
    //  console.log("object2");

    if (modo !== 4) { delay1 = this.localServicio.modosLedDatosLocal[modo].delayLed; }
    else { delay1 = this.getRandomInt(500, maxDelay); }
    let tipo = this.localServicio.modosLedDatosLocal[modo].tipo;
    console.log("luceLed " + delay1, modo);

    this.interval2 = setInterval(_ => {
      //  console.log("interval2");

      // console.log('Forma 1', new Date().getTime());

      let modoled = this.localServicio.modoLocal.modo;
      let delayLed = this.localServicio.modosLedDatosLocal[modo].delayLed;
      let tipoLed = this.localServicio.modosLedDatosLocal[modo].tipo;

      if (modoled !== modo) { console.log("Modo"); this.color = `rgb(0,0,0)`; clearInterval(this.interval2); this.luceLed2(); return; }
      if (delayLed !== delay1 && modoled !== 4) { console.log("delay"); this.color = `rgb(0,0,0)`; clearInterval(this.interval2); this.luceLed2(); return; }
      if (tipoLed !== tipo) { console.log("tipo"); clearInterval(this.interval2); this.luceLed2(); return; }
      modo = modoled;
      console.log("interval2 ", modoled, delayLed, tipoLed);

      if (modoled === 0 || modoled === 1 || modoled === 2) {
        // console.log("object");
        // if ( this.localServicio.modosLedDatosLocal[modoled].tipo===1){

        // }
        delay1 = this.localServicio.modosLedDatosLocal[modoled].delayLed;
        let maxInt = this.localServicio.modosLedDatosLocal[modoled].intensidadMax;
        let minInt = this.localServicio.modosLedDatosLocal[modoled].intensidadMin;
        if (arribaAbajo === true) { //sube
          //  console.log("tipo",tipo);

          if (modoled === 0) {
            verde = 0; azul = 0; if (tipo) { rojo = maxInt; this.color = `rgb(${rojo},${verde},${azul})`; return; }
            if (minInt > rojo) { rojo = minInt; } if (rojo >= maxInt) { arribaAbajo = !arribaAbajo; } else { rojo = rojo + 1; }
          }
          if (modoled === 1) {
            azul = 0; rojo = 0; if (tipo) { verde = maxInt; this.color = `rgb(${rojo},${verde},${azul})`; return; }
            if (minInt > verde) { verde = minInt; } if (verde >= maxInt) { arribaAbajo = !arribaAbajo; } else { verde = verde + 1; }
          }
          if (modoled === 2) {
            rojo = 0; verde = 0; if (tipo) { azul = maxInt; this.color = `rgb(${rojo},${verde},${azul})`; return; }
            if (minInt > azul) { azul = minInt; } if (azul >= maxInt) { arribaAbajo = !arribaAbajo; } else { azul = azul + 1; }
          }

        }
        else if (arribaAbajo === false) {
          //    if (maxInt<rojo) rojo=maxInt;

          if (modoled === 0) { verde = 0; azul = 0; if (rojo <= minInt) { arribaAbajo = !arribaAbajo; } else { rojo = rojo - 1; } }
          if (modoled === 1) { azul = 0; rojo = 0; if (verde <= minInt) { arribaAbajo = !arribaAbajo; } else { verde = verde - 1; } }
          if (modoled === 2) { verde = 0; rojo = 0; if (azul <= minInt) { arribaAbajo = !arribaAbajo; } else { azul = azul - 1; } }
        }
      }
      else if (this.localServicio.modoLocal.modo === 3) {
        console.log("interval2 ");

        delay1 = this.localServicio.modosLedDatosLocal[modoled].delayLed;
        let minInt = this.localServicio.modosLedDatosLocal[modoled].intensidadMin;
        rojo = +(((this.localServicio.modosLedDatosLocal[modoled].valRojo * valF) / 100).toFixed(0));
        verde = +(((this.localServicio.modosLedDatosLocal[modoled].valVerde * valF) / 100).toFixed(0));
        azul = +(((this.localServicio.modosLedDatosLocal[modoled].valAzul * valF) / 100).toFixed(0));
        //console.log("tipo",tipo,rojo,verde,azul); 
        if (arribaAbajo === true) {
          //console.log(valF);

          if (tipo === 1) {
            rojo = this.localServicio.modosLedDatosLocal[modoled].valRojo;
            verde = this.localServicio.modosLedDatosLocal[modoled].valVerde;
            azul = this.localServicio.modosLedDatosLocal[modoled].valAzul;
            this.color = `rgb(${rojo},${verde},${azul})`;
            // console.log("tipo",tipo,rojo,verde,azul); 
            return;
          }
          if (valF >= 100) { arribaAbajo = !arribaAbajo; } else {
            valF++
          }
          //  console.log("arriba",valF);

        }
        else {
          // console.log("rojo",rojo);
          // console.log("abajo",valF);

          if (valF <= minInt) { arribaAbajo = !arribaAbajo; } else {
            valF--
          }

        }
      }
      else if (this.localServicio.modoLocal.modo === 4) {
        //   if ( valF<=0){arribaAbajo=!arribaAbajo;}else{valF--}
        rojo = this.getRandomInt(0, 255);
        verde = this.getRandomInt(0, 255);
        azul = this.getRandomInt(0, 255);
        this.color = `rgb(${rojo},${verde},${azul})`;
        maxDelay = this.getRandomInt(500, this.localServicio.modosLedDatosLocal[4].maxDelay);//
        this.cambioColorPatas(rojo, verde, azul);
        this.cambiColorLed(this.color);
        // console.log(delay);
        clearInterval(this.interval2); this.luceLed2();
      }
      // console.log("rojo",rojo);
      // console.log("color ",this.color);
      // let r = this.getRandomInt(0, 255);
      // let g = 0;//this.getRandomInt(0,255);
      // let b = 0//this.getRandomInt(0,255);  
      //  this.color = `rgb(${rojo},${verde},${azul})`;
      //console.log(this.color);
      this.cambioColorPatas(rojo, verde, azul);
      this.cambiColorLed(this.color);
    }, delay1)
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
