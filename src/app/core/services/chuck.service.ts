import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
// import {Flight, Worker} from '../../flights/models';
@Injectable({
  providedIn: 'root'
})
export class ChucksService {
  private CHUCKNORIS_API_PATH = 'https://api.chucknorris.io/jokes';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.CHUCKNORIS_API_PATH}/categories`)
      .pipe(map((categories) => categories || []));
  }

  getRandom(name: string, categories: {id, name: string} []): Observable<any> {
    // /random?name=Bob&category=dev,explicit
    const cat = categories.map(elt => elt.name).join(',');
    console.log(cat);
    console.log(`${this.CHUCKNORIS_API_PATH}/random?name=${name}&category=${cat}`)
    const req = this.http
      .get<any>(`${this.CHUCKNORIS_API_PATH}/random?name=${name}&category=${cat}`)
      .pipe(tap((res) => console.log(res)));
    req.subscribe();
    return req;
    /*
    return this.http
      .get<any>(`${this.CHUCKNORIS_API_PATH}/random?name=${name}&category=${cat}`)
      .pipe(tap((res) => console.log(res))).subscribe();*/
  }

}
