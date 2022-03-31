import {ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {gsap} from "gsap";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'finish',
  templateUrl: 'finish.component.html',
  styleUrls: ['finish.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FinishComponent implements OnInit {


  @ViewChild('icon', {static: true, read: ElementRef}) i!: ElementRef;
  @ViewChild('icon2', {static: true, read: ElementRef}) i2!: ElementRef

  public ask!: any[];

  constructor(
    private route: Router,
    private zone: NgZone
  ) {
  }


  ngOnInit() {
    this.ask = history.state.ask;
    gsap.to([this.i.nativeElement, this.i2.nativeElement], {
      duration: 1,
      rotateY: '+=360',
      repeat: -1,
      ease: 'none',
    })
  }

  resetGame() {
    this.zone.run(() => this.route.navigate(['/']))
  }


}
