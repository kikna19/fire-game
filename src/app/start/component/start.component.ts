import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {RulesComponent} from "./rules/rules.component";


@Component({
  selector: 'start',
  templateUrl: 'start.component.html',
  styleUrls: ['start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class StartComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  play() {
    this.router.navigate(['easy'])
  }

  rule() {
    this.dialog.open(RulesComponent, {
      width: '45rem',
      height: '30rem',
    })
  }
}
