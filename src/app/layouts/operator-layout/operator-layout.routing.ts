import { Routes} from '@angular/router';

import { TestComponent } from '../../pages/test/test.component';
import { TestListOperatorComponent } from '../../pages/test-list-operator/test-list-operator.component';

export const OperatorLayoutRoutes: Routes = [
  {path: 'tests-list', component: TestListOperatorComponent},
  {path: 'test', component: TestComponent}
];
