import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Modo5PageRoutingModule } from './modo5-routing.module';

import { Modo5Page } from './modo5.page';
import { ComponentesModule } from '../../componentes/componetes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Modo5PageRoutingModule
  ],
  declarations: [Modo5Page]
})
export class Modo5PageModule {}
