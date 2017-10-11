import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Ceremony } from './ceremony.component';
import { Celebration} from './celebration.component'
import { Guestbook} from './guestbook.component'
import { Aboutus} from './aboutus.component';
//import { NotFound } from './notfound.component';
//test
const routes = [
  { path: '', redirectTo: 'app-root', pathMatch: 'full' },
  { path: 'app-root', component: AppComponent },
  { path: 'Ceremony', component: Ceremony },
  { path: 'Celebration', component: Celebration},
  { path: 'Guestbook', component: Guestbook},
  { path: 'Aboutus', component: Aboutus}
  //{ path: '**', component: NotFound }
];

export const AppRouting = RouterModule.forRoot(routes, { 
  useHash: true
});