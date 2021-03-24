import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Modo5Page } from './modo5.page';

const routes: Routes = [
  {
    path: '',
    component: Modo5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Modo5PageRoutingModule {}
