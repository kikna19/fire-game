import {Component, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {interval, Subscription} from "rxjs";
import {
  finalize,
  mapTo,
  scan,
  take,
} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'check-answer',
  templateUrl: 'check-answer.component.html',
  styleUrls: ['check-answer.component.scss'],
})
export class CheckAnswerComponent implements OnInit, OnDestroy {

  @Output() checkedAnswer = new EventEmitter<boolean>();
  @Output() timerPlay = new EventEmitter<boolean>();
  checkAnswer!: Subscription;
  public answerText: any;
  public nextBtn: boolean = false;
  public againBtn: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { answer: string, attempts: number },
    private zone: NgZone,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.checkAnswer = interval(1000).pipe(
      take(3),
      mapTo(-1),
      scan((acc, curr) => {
        return acc + curr
      }, 4),
      finalize(() => setTimeout(() => {
        if (this.data.attempts > 0)
          if (this.data.answer == 'incorrect') {
            this.answerText = 'პასუხი სწორია';
            this.nextBtn = true;
          } else {
            this.answerText = 'პასუხი არასწორია'
            this.againBtn = true;
          }
        else {
          this.nextBtn = true;
          this.answerText = 'გილოცავ !';
        }
      }, 1000))
    ).subscribe(
      res => {
        this.answerText = res;
      }
    )
  }

  nextAsk(){
    this.timerPlay.emit(true);
    if (this.data.attempts == 0) {
      this.checkedAnswer.emit(true)
    }
  }


  ngOnDestroy(): void {
    this.checkAnswer.unsubscribe();
  }

  tryAgain(){
    this.zone.run(() => this.router.navigate(['/']))
  }

}
