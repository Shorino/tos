import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestService } from './test.service';
import { TeaSessionService } from './teasession.service';

@NgModule({
    imports: [ 
      CommonModule,
    ],
  providers:
  [
    TestService,
    TeaSessionService,
  ],
})
export class ServiceModule {
}
