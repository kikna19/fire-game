import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'val',
  pure: true,
})
export class ValuePipe implements PipeTransform {
  transform(value: any): any {
    return Object.values(value)
  }
}
