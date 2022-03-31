import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {fromEvent, Observable, of, Subscription} from "rxjs";
import {delay, finalize, map, pluck, take} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Ask} from "../../../interface/ask.interface";
import {LevelGuard} from "../../../level-guard/level.guard";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'medium',
  templateUrl: 'medium.component.html',
  styleUrls: ['medium.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MediumComponent implements OnInit, OnDestroy {

  public loadAsk$!: Observable<{ ask: Ask }>;
  public prize: number = 100;
  private medium!: any[];
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
      map(level => level[0].medium)
    )
    this.level.nextLevel = false;
    this.medium = history.state.ask;

    this.openSnack();
  }

  openSnack(): void {
    this.snack$ = of(null).pipe(
      delay(1000)
    ).subscribe(() => {
      this.snack.open('ზოგადი ტური', void 0, {
        duration: 3000,
        horizontalPosition: 'start',
      })
    })
  }


  nextRoute(ask: any[]) {
    this.level.nextLevel = true;
    this.medium = [...this.medium, ...ask];
    this.route.navigateByUrl('/hard', {state: {ask: this.medium}})
  }

  ngOnDestroy(): void {
    this.snack$.unsubscribe();
  }

}


