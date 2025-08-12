import { Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home';
import { ApiDataComponent } from '../app/pages/api-data/api-data';
import { QuizFormComponent } from './pages/form/form';
import { NotFoundComponent } from '../app/pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'api-data', component: ApiDataComponent, title: 'API Data' },
  { path: 'form', component: QuizFormComponent, title: 'Form' },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
