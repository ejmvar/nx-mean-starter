import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'users',
    loadChildren: '@nx-mean-starter/navigation/users#NavigationUsersModule',
  },
];
