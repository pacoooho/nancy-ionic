import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Modo4PageRoutingModule } from './modo4-routing.module';

import { Modo4Page } from './modo4.page';
import { ComponentesModule } from '../../componentes/componetes.module';
import { ColorHueModule } from 'ngx-color/hue'; // <color-hue-picker></color-hue-picker>

@NgModule({
  imports: [
    ColorHueModule,
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Modo4PageRoutingModule
  ],
  declarations: [Modo4Page]
})
export class Modo4PageModule {}
