import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Ceremony } from './ceremony.component';
import { Celebration} from './celebration.component'
//import { NotFound } from './notfound.component';

const routes = [
  { path: '', redirectTo: 'app-root', pathMatch: 'full' },
  { path: 'app-root', component: AppComponent },
  { path: 'Ceremony', component: Ceremony },
  { path: 'Celebration', component: Celebration}
  //{ path: '**', component: NotFound }
];

export const AppRouting = RouterModule.forRoot(routes, { 
  useHash: true
});