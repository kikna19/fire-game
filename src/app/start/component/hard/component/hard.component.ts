import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import {fromEvent, Observable, of, Subscription} from "rxjs";
import {delay, map, pluck, take} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Ask} from "../../../interface/ask.interface";
import {LevelGuard} from "../../../level-guard/level.guard";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'hard',
  templateUrl: 'hard.component.html',
  styleUrls: ['hard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HardComponent implements OnInit, OnDestroy {


  public loadAsk$!: Observable<{ ask: Ask }>;
  public prize: number = 500;
  private hard!: any[];
  private snack$!: Subscription;


  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private level: LevelGuard,
    private snack: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.loadAsk$ = this.router.data.pipe(
      pluck('ask'),
      map(level => level[0].hard)
    );
    this.level.nextLevel = false;
    this.hard = history.state.ask;

    this.openSnack();
  }

  openSnack(): void {
    this.snack$ = of(null).pipe(
      delay(1000)
    ).subscribe(() => {
      this.snack.open('რთული ტური', void 0, {
        duration: 3000,
        horizontalPosition: 'start',
      })
    })
  }

  nextRoute(ask: any[]) {
    this.level.nextLevel = true;
    this.hard = [...this.hard, ...ask]
    this.route.navigateByUrl('/finish', {state: {ask: this.hard}})
  }

  ngOnDestroy(): void {
    this.snack$.unsubscribe();
  }

}
