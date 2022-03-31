import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'iterable',
  pure: true,
})
export class IterablePipe implements PipeTransform {

  transform(value: any): any {
    let arr = [];
    for (let item in value){
     arr.push(value[item]);
    }
    return arr
  }
}
