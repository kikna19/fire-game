import {ChangeDetectionStrategy, Component, OnDestroy, OnInit,} from "@angular/core";
import {Observable, of, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {delay, map, pluck} from "rxjs/operators";
import {Ask} from "../../../interface/ask.interface";
import {LevelGuard} from "../../../level-guard/level.guard";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'easy',
  templateUrl: 'easy.components.html',
  styleUrls: ['easy.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EasyComponent implements OnInit, OnDestroy {

  public loadAsk$: Observable<{ ask: Ask }>;
  public prize: number = 0;
  private snack$!: Subscription;


  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private level: LevelGuard,
    private snack: MatSnackBar,
  ) {
    this.loadAsk$ = this.router.data.pipe(
      pluck('ask'),
      map(level => level[0].easy),
    );
  }

  ngOnInit(): void {

    this.openSnack();
  }

  openSnack(): void {
    this.snack$ = of(null).pipe(
      delay(2000)
    ).subscribe(() => {
      this.snack.open('მარტივი ტური', void 0, {
        duration: 3000,
        horizontalPosition: 'start',
      })
    })
  }

  nextRoute(ask: any[]) {
    this.level.nextLevel = true;
    this.route.navigateByUrl('/medium', {state: {ask: ask}})
  }

  ngOnDestroy(): void {
    this.snack$.unsubscribe();
  }


}
