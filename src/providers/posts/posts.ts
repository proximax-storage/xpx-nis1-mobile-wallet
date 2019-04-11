import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalCacheProvider } from '../local-cache/local-cache';
import { Storage } from '@ionic/storage';


/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {

  constructor(public http: HttpClient, private cache: LocalCacheProvider, private storage: Storage) {
    console.log('Hello PostsProvider Provider');
  }

/*   public getAll(): Observable<any> {
    let url = 'https://proximax-wallet-dashboard.herokuapp.com/posts';
    return this.http.get(url);
  } */

  public seenPost(postId): Promise<any> {
    return this.storage.get("sennPosts").then(sennPosts => {
      let posts: any[] = sennPosts;

      console.log(posts);
      if (posts) {
        posts = posts.filter(_ => _.id != postId);
        posts.push({ id: postId });
      } else {
        posts = [{ id: postId }]; // Genesis post
      }
      return this.storage.set("sennPosts", posts);
    })

  }

  public getSeenPosts(): Promise<any> {
    return this.storage.get("sennPosts");
  }

  public getUnreadCount(): Promise<any> {
    return new Promise((resolve) => {
      this.getSeenPosts().then(seenPosts => {
        // this.getAll().toPromise().then(async posts => {
        //   if (seenPosts) {
        //     resolve(posts.length - seenPosts.length);
        //   } else {
        //     resolve(posts.length);
        //   }
        // })
      })
    })
  }
}
