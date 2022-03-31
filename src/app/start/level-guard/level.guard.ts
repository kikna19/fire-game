import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";

@Injectable()
export class LevelGuard implements CanActivate {

  nextLevel: boolean = false;

  canActivate(): boolean {
    return this.nextLevel;
  }
}
