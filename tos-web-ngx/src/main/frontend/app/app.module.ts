import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, Injectable, APP_INITIALIZER } from '@angular/core';
import { RouterModule, PreloadAllModules, Router } from '@angular/router';


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
    TeaSessionComponent
  ],
  imports: [ /** import Angular's modules **/
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: false, enableTracing :false, preloadingStrategy: PreloadAllModules }),
    ServiceModule,
  ],
})
export class AppModule {


}
