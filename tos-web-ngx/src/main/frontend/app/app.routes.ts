import { Routes } from '@angular/router';
import { HomeComponent } from './component/page/home/home.component';
import { LoginComponent } from './component/page/login/login.component';
import { TeaSessionComponent } from './component/page/tea-session/tea-session.component';

export const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"search-tea-session", component:HomeComponent},
  {path:"search-tea-session/:teaSessionName", component:HomeComponent},
  {path:"tea-session/:teaSessionId", component:TeaSessionComponent},
  {path:"login", component:LoginComponent},
];
