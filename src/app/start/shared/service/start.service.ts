import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ask} from "../../interface/ask.interface";


@Injectable()
export class StartService{

  constructor(
    private http: HttpClient
  ) {
  }

  loadAsks(){
    return this.http.get<Observable<Ask>>('assets/db.json')
  }
}
