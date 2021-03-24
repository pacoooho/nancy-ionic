import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Modo4Page } from './modo4.page';

const routes: Routes = [
  {
    path: '',
    component: Modo4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modo4PageRoutingModule {}
