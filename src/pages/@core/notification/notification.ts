import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostsProvider } from '../../../providers/posts/posts';
import { oneSignalProvider } from '../../../providers/onesignal/onesignal';
import { timestamp } from 'rxjs/operator/timestamp';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  posts:Array<any>=[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private articles: PostsProvider, private onesignal:oneSignalProvider) {

    /* this.articles.getAll().subscribe(posts=> {
      console.log("Blog posts", posts);
      this.posts = posts;
    }) */

      this.onesignal.sennnotific().then(res=> {
        console.log("NOTIFICACIONES", JSON.stringify(res));
        console.log("NOTIFICACIONES", res);
        this.posts = res;
      })

    this.articles.getUnreadCount().then(res => {
    })

  }

  doRefresh(refresher) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.onesignal.sennnotific().then(res=> {

        this.posts = res;
      })
      /* this.articles.getAll().subscribe(posts=> {
        console.log("Blog posts", posts);
        this.posts = posts;
      }) */

      refresher.complete();
    }, 0);
  }

 seenPost(postId) {
    console.log('post id', postId)
    this.articles.seenPost(postId).then(res=> {
      console.log("seenPosts", res);
      this.getAllSeenPosts();
      this.articles.getUnreadCount().then(res  => {
        console.log("Unread count", res);
      })


    })
  }

  getAllSeenPosts(){
    this.articles.getSeenPosts().then(res=> {
      console.log("getAllSeenPosts", res);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  showMore(post){
    console.log("showMore", post)

    this.posts.map((_post) => {
      console.log("aaaaaaaaaaaaaa", _post['notific']['notificationID'])
        if(post['notificationID'] == _post['notific']['notificationID']){
          console.log("xxxxxxxxxxxxxxxxxx", post['notificationID'])
          console.log("yyyyyyyyyyyyy", _post['notific']['notificationID'])
            _post.expanded = !_post.expanded;
        } else {
            _post.expanded = false;
        }

        return _post;

    });

}

}
