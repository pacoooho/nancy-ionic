import { ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutoPageRoutingModule } from './tuto-routing.module';

import { TutoPage } from './tuto.page';
import { createAnimation, Animation } from '@ionic/core';
 
@NgModule({
  imports: [
     CommonModule,
    FormsModule,
    IonicModule,
    TutoPageRoutingModule
  ],
  declarations: [TutoPage]
})
export class TutoPageModule  {}
