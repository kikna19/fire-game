import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'color'
})

export class ColorPipe implements PipeTransform {

  transform(value: string): any {
    if (value == 'correct')
      return 'green'
    else
      return 'red'

  }
}
