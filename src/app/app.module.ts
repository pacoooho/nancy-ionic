import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
 import {IonicStorageModule  } from '@ionic/storage-angular';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ColorHueModule } from 'ngx-color/hue'; // <color-hue-picker></color-hue-picker>
import { ComponentesModule } from './componentes/componetes.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    ColorHueModule,
    ComponentesModule,
    FormsModule,
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
    IonicStorageModule.forRoot()
    ],
  providers: [
    BluetoothSerial,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
