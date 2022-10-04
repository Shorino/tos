import { Routes } from '@angular/router';
import { CreateSessionComponent } from './component/page/create-session/create-session.component';
import { HomeComponent } from './component/page/home/home.component';
import { LoginComponent } from './component/page/login/login.component';
import { ManageUserComponent } from './component/page/manage-user/manage-user.component';
import { OrderComponent } from './component/page/order/order.component';
import { TeaSessionComponent } from './component/page/tea-session/tea-session.component';

export const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"search-tea-session", component:HomeComponent},
  {path:"search-tea-session/:teaSessionName", component:HomeComponent},
  {path:"tea-session/:teaSessionId", component:TeaSessionComponent},
  {path:"login", component:LoginComponent},
  {path:"order", component:OrderComponent},
  {path:"create-session", component:CreateSessionComponent},
  {path:"manage-user", component:ManageUserComponent},
];
