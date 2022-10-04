import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, Injectable, APP_INITIALIZER } from '@angular/core';
import { RouterModule, PreloadAllModules, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routes } from './app.routes';

/*
 * Platform modules
 */
import { ServiceModule } from './service/service.module';

/** App is our top level component **/
import { AppComponent } from './app.component';


import '../styles/theme.scss';
import { HeaderComponent } from './component/partial/header/header.component';
import { HomeComponent } from './component/page/home/home.component';
import { SearchComponent } from './component/partial/search/search.component';
import { TeaSessionComponent } from './component/page/tea-session/tea-session.component';
import { LoginComponent } from './component/page/login/login.component';
import { OrderComponent } from './component/page/order/order.component';
import { CreateSessionComponent } from './component/page/create-session/create-session.component';
import { ManageUserComponent } from './component/page/manage-user/manage-user.component';


/**
 * Aot compilation requires a reference to an exported function.
 */


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ 
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TeaSessionComponent,
    LoginComponent,
    OrderComponent,
    CreateSessionComponent,
    ManageUserComponent
  ],
  imports: [ /** import Angular's modules **/
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: false, enableTracing :false, preloadingStrategy: PreloadAllModules }),
    ServiceModule,
    ReactiveFormsModule,
  ],
})
export class AppModule {


}
