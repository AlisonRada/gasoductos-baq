import { Routes} from '@angular/router';

import { TestComponent } from '../../pages/test/test.component';
import { TestListOperatorComponent } from '../../pages/tests-list-operator/tests-list-operator.component';

export const OperatorLayoutRoutes: Routes = [
  {path: 'tests-list', component: TestListOperatorComponent},
  {path: 'test', component: TestComponent},
  //{path: '**', redirectTo: 'tests-list'}
];
