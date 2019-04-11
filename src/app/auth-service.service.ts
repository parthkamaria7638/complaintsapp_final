 import { AppUser } from './Models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

import * as firebase from 'firebase/app';
import { UserService } from './user.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthServiceService {

  user$: Observable<firebase.User>;
  userID: string;
  mouseEvents: Subscription;
  timer: Subscription;

  constructor(private afAuth: AngularFireAuth,
    private userService: UserService,
    private db: AngularFireDatabase
    ) { 
      this.user$ =  afAuth.authState;
      this.afAuth.authState
        .subscribe(user => {
          if (user && localStorage.getItem("signup") == "false") {
            this.userID = user.uid
            this.updateOnConnect()
            this.updateOnDisconnect()
            this.updateOnIdle()
          }
        });
    }

  signup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .switchMap(user => {
      if (user && localStorage.getItem("signup") == "false") {
        return this.userService.get(user.uid);
      }
      return Observable.of(null);
    });
  }

  logout() {
    this.updateStatus('offline');
    this.mouseEvents.unsubscribe();
    this.timer.unsubscribe();
    return this.afAuth.auth.signOut();
  }

  private updateStatus(status: string) {
    if (!this.userID) return; 
    this.db.object('Users/' + this.userID).update({ status: status }); 
  }

  private updateOnConnect() {
     return this.db.object('.info/connected')
      .subscribe(connected => {
        let status = connected.$value ? 'online': 'offline';
        this.updateStatus(status);
      });
  }

  private updateOnDisconnect() {
    firebase.database().ref().child('Users/' + this.userID)
      .onDisconnect()
        .update({ status: 'offline' });
  }

  private updateOnIdle() {
    this.mouseEvents = Observable.fromEvent(document, 'mousemove').throttleTime(2000)
                          .subscribe(() => {
                            this.updateStatus('online')
                            this.resetTimer()
                          });
  }

  private resetTimer() {
    if (this.timer) this.timer.unsubscribe();

    this.timer = Observable.timer(5000).subscribe(() => this.updateStatus('away'));
  }
}
