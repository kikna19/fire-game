import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'key',
  pure: false,
})
export class KeyPipe implements PipeTransform {
  transform(value: any): any {
    return Object.keys(value)
  }
}
