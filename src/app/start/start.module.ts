import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {StartComponent} from "./component/start.component";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "./shared/shared.module";
import {StartResolve} from "./shared/service/resolve/start.resolve";
import {EasyComponent} from "./component/easy/component/easy.component";
import {MediumComponent} from "./component/medium/component/medium.component";
import {HardComponent} from "./component/hard/component/hard.component";
import {FinishComponent} from "./component/finish/finish.component";
import {LevelGuard} from "./level-guard/level.guard";
import {MatDialogModule} from "@angular/material/dialog";
import {RulesComponent} from "./component/rules/rules.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {IconPipe} from "./component/finish/pipe/icon.pipe";
import {ColorPipe} from "./component/finish/pipe/color.pipe";


const ROUTES: Routes = [
  {path: '', component: StartComponent},
  {path: 'easy', component: EasyComponent, resolve: {ask: StartResolve}},
  {path: 'medium', component: MediumComponent, resolve: {ask: StartResolve}, canActivate: [LevelGuard]},
  {path: 'hard', component: HardComponent, resolve: {ask: StartResolve}, canActivate: [LevelGuard]},
  {path: 'finish', component: FinishComponent, canActivate: [LevelGuard]}
]

@NgModule({
  declarations: [
    StartComponent,
    EasyComponent,
    MediumComponent,
    HardComponent,
    FinishComponent,
    RulesComponent,
    IconPipe,
    ColorPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    SharedModule.forRoot(),
    MatDialogModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule
  ],

  providers: [
    StartResolve,
    LevelGuard,
  ]

})

export class StartModule {

}
