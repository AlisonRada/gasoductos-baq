import { Routes } from '@angular/router';

import { OperatorsListComponent } from '../../pages/operators-list/operators-list.component';
import { NewOperatorComponent } from '../../pages/new-operator/new-operator.component';
import { EditOperatorComponent } from '../../pages/edit-operator/edit-operator.component';
import { CreateTestComponent } from 'src/app/pages/create-test/create-test.component';

export const ChiefLayoutRoutes: Routes = [
  { path: 'operators-list', component: OperatorsListComponent },
  { path: 'new-operator', component: NewOperatorComponent },
  { path: 'details/:id', component: EditOperatorComponent },
  { path: 'addTest', component: CreateTestComponent},
  { path: '**', redirectTo: 'operators-list'}
];