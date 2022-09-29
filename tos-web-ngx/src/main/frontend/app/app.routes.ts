import { Routes } from '@angular/router';
import { HomeComponent } from './component/partial/page/home/home.component';

export const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"search-tea-session", component:HomeComponent},
  {path:"search-tea-session/:teaSessionName", component:HomeComponent},
];
