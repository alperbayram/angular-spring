import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    loadComponent: () =>
      import('./apartment/apartment.component').then(
        (m) => m.ApartmentComponent
      ),
  },
  {
    path: 'flat-list',
    loadComponent: () =>
      import('./flat-list/flat-list.component').then(
        (m) => m.FlatListComponent
      ),
  },
  {
    path: 'flat/load/:id',
    loadComponent: () =>
      import('./flat-detail/flat-detail.component').then(
        (m) => m.FlatDetailComponent
      ),
  },
  {
    path: 'flat-form',
    loadComponent: () =>
      import('./flat-form/flat-form.component').then(
        (m) => m.FlatFormComponent
      ),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./my-standalone/my-standalone.component').then(
        (m) => m.MyStandaloneComponent
      ),
  },
];
