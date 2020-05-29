import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { OperatorLayoutComponent } from './layouts/operator-layout/operator-layout.component';
import { ChiefLayoutComponent } from './layouts/chief-layout/chief-layout.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: '',
    component: OperatorLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/operator-layout/operator-layout.module').then(m => m.OperatorLayoutModule)
      }
    ]
  }, {
    path: '',
    component: ChiefLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/chief-layout/chief-layout.module').then(m => m.ChiefLayoutModule)
      }
    ]
  }/*, {
    path: '**',
    redirectTo: 'login'
  }*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ]
})
export class AppRoutingModule { }
