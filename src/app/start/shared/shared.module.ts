import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {SharedComponent} from "./component/shared.component";
import {StartService} from "./service/start.service";
import {MatButtonModule} from "@angular/material/button";
import {IterablePipe} from "./pipe/iterable.pipe";
import {ValuePipe} from "./pipe/value.pipe";
import {CheckAnswerComponent} from "./component/check-answer/check-answer.component";
import {MatDialogModule} from "@angular/material/dialog";
import {KeyPipe} from "./pipe/key.pipe";
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TimeoutComponent} from "./component/timeout/timeout.component";
import {HistoryService} from "./service/history/history.service";


@NgModule({
  declarations: [
    SharedComponent,
    CheckAnswerComponent,
    TimeoutComponent,
    ValuePipe,
    IterablePipe,
    KeyPipe,

  ],

  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    MatToolbarModule
  ],
    exports: [
        SharedComponent,
        KeyPipe,
        ValuePipe
    ],

})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [
        StartService,
        HistoryService
      ],
    }
  }
}
