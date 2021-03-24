import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
 import { Modo13PageModule } from './paginas/modo13/modo13.module';
const routes: Routes = [
   
  {
    path: '',
    redirectTo: '/tuto',
    pathMatch: 'full'
  },
  {
    path: 'modo13',
    // component: Modo13PageModule,
    // pathMatch: 'full'
    loadChildren: () => import('./paginas/modo13/modo13.module').then( m => m.Modo13PageModule)
  },
 
  {
    path: 'modo4',
    loadChildren: () => import('./paginas/modo4/modo4.module').then( m => m.Modo4PageModule)
  },
  {
    path: 'modo5',
    loadChildren: () => import('./paginas/modo5/modo5.module').then( m => m.Modo5PageModule)
  },
  {
    path: 'tuto',
    loadChildren: () => import('./paginas/tuto/tuto.module').then( m => m.TutoPageModule)
  },
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
