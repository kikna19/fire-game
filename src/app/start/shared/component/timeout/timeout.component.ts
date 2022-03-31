import {ChangeDetectionStrategy, Component, NgZone} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'timeout',
  templateUrl: 'timeout.component.html',
  styleUrls: ['timeout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimeoutComponent {
  constructor(
    private zone: NgZone,
    private router: Router
  ) {
  }

  tryAgain() {
    this.zone.run(() => this.router.navigate(['/']))
  }
}
