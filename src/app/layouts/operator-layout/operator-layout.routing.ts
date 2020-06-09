import { Routes} from '@angular/router';

import { TestComponent } from '../../pages/test/test.component';
import { TestListOperatorComponent } from '../../pages/tests-list-operator/tests-list-operator.component';
import { BarChartComponent } from '../../pages/bar-chart/bar-chart.component';

export const OperatorLayoutRoutes: Routes = [
  {path: 'tests-list', component: TestListOperatorComponent},
<<<<<<< HEAD
  {path: 'test', component: TestComponent},
=======
  {path: 'test/:id', component: TestComponent},
>>>>>>> c5bebdbdbd81c8f1025c3b9cb71df124cfe8b6e8
  {path: 'results', component:BarChartComponent}
  //{path: '**', redirectTo: 'tests-list'}
];
