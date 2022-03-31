import {AfterViewInit, Component} from "@angular/core";
import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'rules',
  templateUrl: 'rules.component.html',
  styleUrls: ['rules.component.scss'],
})
export class RulesComponent implements AfterViewInit {

  barWidth: any;


  ngAfterViewInit(): void {
    const content: any = document.querySelector('.mat-dialog-container');
    fromEvent(content, 'scroll').pipe(
      map((e: any) => this.getScroll(
        e.srcElement
      ))
    ).subscribe(
      (val: number) => {
        this.barWidth = val.toFixed(0)
      }
    )
  }

  getScroll(e: any): number {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = e
    return scrollTop / (scrollHeight - clientHeight) * 100;
  }


}
