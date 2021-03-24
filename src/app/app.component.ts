import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { BluetoohService } from './servicios/bluetooh.service';
import { DataLocalService } from './servicios/data-local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit{
  appPages = [
    {
      title: 'Rojo Verde Azul',
      url: '/modo13',
      icon: 'calendar'
    },
    {
      title: 'RGB',
      url: '/modo4',
      icon: 'people'
    },
    {
      title: 'Disco',
      url: '/modo5',
      icon: 'map'
    },
    {
      title: 'Tutorial',
      url: '/tuto',
      icon: 'information-circle'
    }
  ];
  dark = true;
   constructor(
    public bluetoothServicio: BluetoohService,
 
       private storage: DataLocalService,
     private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private toastCtrl: ToastController,
  ) {
    // this.initializeApp();
    console.log("constructor");
    this.initializeApp();
  }

  async ngOnInit() {
    console.log("ngOnInit");
    this.menu.enable(true);
// this.menu.open();
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      console.log("initializeApp app");
 
    });
  }

  openTutorial() {
    this.menu.enable(false);
    //  this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

}
