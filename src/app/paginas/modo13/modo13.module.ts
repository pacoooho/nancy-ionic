import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Modo13PageRoutingModule } from './modo13-routing.module';

import { Modo13Page } from './modo13.page';
import { ComponentesModule } from '../../componentes/componetes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Modo13PageRoutingModule
  ],
  declarations: [Modo13Page]
})
export class Modo13PageModule {}
