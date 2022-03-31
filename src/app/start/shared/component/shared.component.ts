import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input, NgZone,
  OnDestroy,
  OnInit, Output,
  QueryList, ViewChild,
  ViewChildren
} from "@angular/core";
import {Ask} from "../../interface/ask.interface";
import {fromEvent, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CheckAnswerComponent} from "./check-answer/check-answer.component";
import {map} from "rxjs/operators";
import gsap from "gsap";
import {TimeoutComponent} from "./timeout/timeout.component";

@Component({
  selector: 'shared',
  styleUrls: ['shared.component.scss'],
  templateUrl: 'shared.component.html',
})
export class SharedComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() loadAsk!: Observable<any>;
  @Input() prize!: number;
  @ViewChildren('btns', {read: ElementRef}) btns!: QueryList<ElementRef>;
  @Output() nextLevel = new EventEmitter<any>();
  @ViewChild('arrow', {static: true}) arrow!: ElementRef;
  @ViewChild('circle', {static: true}) circle!: ElementRef;
  arrowTL = gsap.timeline();
  circleTL = gsap.timeline();
  public askArr: any[] = [];
  public answersArr: Ask[] = [];
  private nextAskSub$!: Subscription;
  private loadAsk$!: Subscription;
  public btnColors = ['green', 'yellow', 'purple', 'blue'];
  public index: number = 0;
  private attempts: number = 3;
  public btnStatus!: boolean;


  constructor(
    private route: Router,
    private dialog: MatDialog,
  ) {
  }


  ngOnInit() {
    this.loadAsk$ = this.loadAsk.pipe(
      map(arr => arr.sort(() => Math.random() - .5)),
      map(item => [item[0], item[1], item[2]])
    ).subscribe(res => {
      this.askArr.push(res);
      this.answersArr = this.askArr[0][0].answers;
      this.answersArr.sort(() => Math.random() - .5);
      this.btnColors.sort(() => Math.random() - .5);
    })
    this.timer();
  }

  ngAfterViewInit() {
    this.checkAnswer();
  }

  checkAnswer() {
    const btn = this.btns.map(btn => btn.nativeElement);
    this.nextAskSub$ = fromEvent(btn, 'click')
      .subscribe((btn: any) => {
        this.attempts--;
        btn.target.disabled = true;
        this.arrowTL.pause();
        this.circleTL.pause();
        const dialogRef = this.dialog.open(CheckAnswerComponent, {
          width: '20rem',
          height: '20rem',
          data: {answer: btn.target.value, attempts: this.attempts},
          disableClose: true,
        });
        dialogRef.componentInstance.timerPlay.subscribe(() => {
          this.arrowTL.play();
          this.circleTL.play();
        })
        dialogRef.componentInstance.checkedAnswer.subscribe(
          () => {
            this.arrowTL.restart();
            this.circleTL.restart();
            if (this.index <= 1) {
              this.randomize();
              Array.from(document.querySelectorAll('button')).forEach(b => b.disabled = false);
            } else {
              this.nextLevel.emit(this.askArr);
            }
          }
        )
      })
  }

  randomize() {
    this.index++;
    this.answersArr = this.askArr[0][this.index].answers;
    this.answersArr.sort(() => Math.random() - .5);
    this.btnColors.sort(() => Math.random() - .5);
    this.attempts = 3;
  }

  timer(): void {
    this.arrowTL.to(this.arrow.nativeElement, {
      rotation: 360,
      transformOrigin: "50% 100%",
      duration: 30,
      ease: 'none',
    }).then(() => this.tryAgain())
    this.circleTL.fromTo(this.circle.nativeElement, {
      strokeDashoffset: 600
    }, {
      strokeDashoffset: 0,
      duration: 45,
      ease: 'none',
    })
  }

  tryAgain() {
    this.dialog.open(TimeoutComponent, {
      width: '20rem',
      height: '20rem',
      disableClose: true,
    })
  }


  ngOnDestroy(): void {
    this.loadAsk$.unsubscribe();
    this.nextAskSub$.unsubscribe();
    this.circleTL.clear();
    this.arrowTL.clear();
  }

}
