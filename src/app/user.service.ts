import { AppUser } from './Models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  get(uid: string): FirebaseObjectObservable<AppUser> {
    console.log(uid);
    return this.db.object('/Users/' + uid);
  }

}
