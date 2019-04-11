import { AngularFireDatabase } from 'angularfire2/database';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthServiceService } from './auth-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { SocketService } from './../socket.service';
import { Component, OnInit } from '@angular/core';
import { ComplaintsService } from './complaints.service';
import { async } from 'q';
import { AppUser } from './Models/app-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  JSONdata;
  user: AppUser;
  isActive = true;
  isAdmin: boolean = false;
  showSpinner: boolean = true;
  Employees;

  constructor(
    private auth: AuthServiceService,
    socketService: SocketService,
    complaintsService: ComplaintsService,
    private flashMessagesService: FlashMessagesService,
    private db: AngularFireDatabase
    ) {
      if (this.user) {
        if (this.user.role == "Admin")
        this.isAdmin = true;
      }
      
    socketService.reveivedData()
        .subscribe(data => {
          this.JSONdata = JSON.parse(JSON.stringify(data));
          console.log(this.JSONdata);
          if (this.user) {
            if (this.user.role == "Admin") {
              complaintsService.manageComplaints(this.JSONdata);
            }
          }
      });
  }

  logout() {
    this.showSpinner = true;
    this.auth.logout()
      .then(res => {
        this.showSpinner = false;
        this.flashMessagesService.show('Logged out succcessfully', { cssClass: 'flashMessage flash-success', timeout: 2000 });
      })
      .catch(err => {
        this.showSpinner = false;
        this.flashMessagesService.show('Something went wrong', { cssClass: 'flashMessage flash-danger', timeout: 2000 });
      });
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => {
      if (appUser) {
        this.showSpinner = false;
        this.user = appUser;
      } else {
        this.user = null;
        this.showSpinner = false;
      }
    });
  }
}
 
  