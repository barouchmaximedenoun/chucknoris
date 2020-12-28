import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ChucksService} from '../../core/services/chuck.service';
import {map, tap} from 'rxjs/operators';
import {element} from 'protractor';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
  name: any;
  categoryModel: any;
  categories$: Observable<any>;
  random$: Observable<any>;

  constructor(private chuckservice: ChucksService) {
    this.categories$ = chuckservice.getCategories().pipe(
          map((categories) => (categories.map((elt, index) => ({id: index, name: elt})))),
          tap((res => {
      console.log('cat=', res);
    } )));
  }

  ngOnInit(): void {
  }

  handleSelectChange = (e) => {
    console.log(e);
  }
  handleQuery = () => {
    console.log(this.name);
    console.log(this.categoryModel);
    this.random$ = this.chuckservice.getRandom(this.name, this.categoryModel).pipe(
      tap((res => {
        console.log('random=', res);
      } )));
  }

}
