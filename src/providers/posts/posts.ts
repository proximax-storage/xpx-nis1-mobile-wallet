import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalCacheProvider } from '../local-cache/local-cache';

/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {

  constructor(public http: HttpClient, private cache: LocalCacheProvider) {
    console.log('Hello PostsProvider Provider');
  }

  public getAll(): Observable<any> {
    // let url = 'https://proximax-wallet-dashboard.herokuapp.com/posts';
    // return this.http.get(url);

    let url = 'https://proximax-wallet-dashboard.herokuapp.com/posts';
    let requestObservable = this.http.get(url);
    return this.cache.observable('posts', requestObservable, 60*60) // 1 hour validity
  }
}