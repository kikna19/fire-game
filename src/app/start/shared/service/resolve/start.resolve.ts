import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {StartService} from "../start.service";

@Injectable()
export class StartResolve implements Resolve<any>{

  constructor(
    private startService: StartService
  ) {
  }

  resolve(): any {
    return this.startService.loadAsks();
  }
}
