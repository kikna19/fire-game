import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {pluck} from "rxjs/operators";


export class HistoryService {
  played = new BehaviorSubject<any[]>([])

  get value() {
    return this.played.value
  }

  getHistory() {
    return this.played.asObservable();
  }

  set(ask: any[], name: string) {
    this.played.next({...this.value, [name]: ask})
  }

}
