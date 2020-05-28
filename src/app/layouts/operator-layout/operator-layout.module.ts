import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Rutas
import { OperatorLayoutRoutes } from './operator-layout.routing';

//Componentes
import { TestComponent } from '../../pages/test/test.component';
import { TestListOperatorComponent } from '../../pages/test-list-operator/test-list-operator.component';

@NgModule({
  declarations: [
    TestComponent,
    TestListOperatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OperatorLayoutRoutes),
    FormsModule
  ]
})
export class OperatorLayoutModule { }
