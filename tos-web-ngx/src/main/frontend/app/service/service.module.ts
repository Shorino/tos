import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestService } from './test.service';
import { TeaSessionService } from './tea-session.service';
import { OrderService } from './order.service';
import { UserService } from './user.service';
import { EventService } from './event.service';

@NgModule({
    imports: [ 
      CommonModule,
    ],
  providers:
  [
    TestService,
    TeaSessionService,
    OrderService,
    UserService,
    EventService,
  ],
})
export class ServiceModule {
}
