import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import gsap from 'gsap';
import {BehaviorSubject, interval} from "rxjs";
import {take} from "rxjs/operators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'game';



  ngOnInit() {

  }



}
