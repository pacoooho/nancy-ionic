import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Modo13Page } from './modo13.page';

const routes: Routes = [
  {
    path: '',
    component: Modo13Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modo13PageRoutingModule {}
