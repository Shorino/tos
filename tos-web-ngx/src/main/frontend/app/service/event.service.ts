import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { EventData } from "../model/EventData";

@Injectable()
export class EventService {
  private subject = new Subject<EventData>();

  sendEvent(eventData:EventData){
    this.subject.next(eventData);
  }
  getEvent():Observable<any>{
    return this.subject.asObservable();
  }
}
