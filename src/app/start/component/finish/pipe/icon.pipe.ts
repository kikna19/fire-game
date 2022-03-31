import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: string): any {

    if (value == 'correct')
      return 'done';
    else
      return 'clear'

  }

}
