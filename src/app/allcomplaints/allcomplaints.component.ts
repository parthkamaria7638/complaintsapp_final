import { ComplaintsService } from './../complaints.service';
import { Http, Headers } from '@angular/http';
import { SocketService } from './../../socket.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-allcomplaints',
  templateUrl: './allcomplaints.component.html',
  styleUrls: ['./allcomplaints.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000)
      ])
    ]),
    trigger('fadeOut', [
      transition('* => void', [
        style({ opacity: 1 }),
        animate(2000, style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class AllcomplaintsComponent implements OnInit {

  complaints;
  current = new Date().getTime();
  currTime: number = new Date().getTime();
  
  constructor(private db: AngularFireDatabase,
    private complaintService: ComplaintsService,
    private empService: EmployeeService
    ) { 
    this.db.list('/twittercomplaints')
      .subscribe(data => {
        this.complaints = data;
        console.log(data);
      });

      setInterval(() => {
        this.currTime = new Date().getTime();
      }, 1000);
  }

  approveComplaint(complaint) {
    if (complaint.platform == 'Twitter') {
      if (complaint.mode == 'direct_message') {
        this.db.object('/twittercomplaints/' + complaint.$key)
        .update({ approved: 'true' })
          .then(data => {
            this.complaintService.notifyUserWithTrackingLinkDM(complaint.IssuerID, complaint.$key)
              .subscribe(data => {
                console.log(data);
              });
            this.empService.assignToEmployee(complaint.Type, complaint.$key);
          })
          .catch(err => {
            console.log('Something went wrong');
          });
      } else if (complaint.mode == 'tweet') {
        this.db.object('/twittercomplaints/' + complaint.$key)
        .update({ approved: 'true' })
          .then(data => {
            this.complaintService.notifyUserWithTrackingLinkTweet(complaint.tweet_id, complaint.IssuerUsername, complaint.$key)
              .subscribe(data => {
                console.log(data);
              });
              this.empService.assignToEmployee(complaint.Type, complaint.$key);
          })
          .catch(err => {
            console.log('Something went wrong');
          });
      }
      
    }
     else if (complaint.platform == 'Reddit') {
      this.db.object('/twittercomplaints/' + complaint.$key)
      .update({ approved: 'true' })
        .then(data => {
          console.log("Success");
        })
        .catch(err => {
          console.log('Something went wrong');
        });
     }
     else if (complaint.platform == 'Facebook') {
      this.db.object('/twittercomplaints/' + complaint.$key)
      .update({ approved: 'true' })
        .then(data => {
          this.complaintService.sendFBMessage(
            complaint.IssuerID, 
            "Your complaint has been approved by the complaints manager. Here's the link to track it: " + "https://domain.com/" + complaint.$key
            ).subscribe(data => {
              console.log(data);
            });
        })
        .catch(err => {
          console.log('Something went wrong');
        });
     }
    
  }

  deleteComplaint(complaint) {
    if (complaint.platform == 'Twitter') {
      if (complaint.mode == "direct_message") {
        this.db.object('/twittercomplaints/' + complaint.$key).remove()
        .then(data => {
            this.complaintService.notifyUserOfComplaintDeletionDM(complaint)
              .subscribe(data => {
                console.log(data);
              });
        })
        .catch(err => {
          console.log('Something went wrong');
        });
      }
      else if (complaint.mode == "tweet") {
        this.db.object('/twittercomplaints/' + complaint.$key).remove()
        .then(data => {
            this.complaintService.notifyUserOfComplaintDeletionTweet(complaint)
              .subscribe(data => {
                console.log(data);
              });
        })
        .catch(err => {
          console.log('Something went wrong');
        });
      }
    }
    else if (complaint.platform == 'Reddit') {
      this.db.object('/twittercomplaints/' + complaint.$key)
      .update({ approved: 'false' })
        .then(data => {
            console.log('Success');
        })
        .catch(err => {
          console.log('Something went wrong');
        });
    }

    else if (complaint.platform == 'Facebook') {
        this.db.object('/twittercomplaints/' + complaint.$key).remove()
        .then(data => {
            this.complaintService.sendFBMessage(
              complaint.IssuerID, 
              "We're sorry to inform you that your complaint \n \nLocation:" + complaint.Location + "Type: " + complaint.Type + "Body: " + complaint.Body + "\n \nmade on " + new Date(complaint.Timestamp) + " was rejected by the complaints manager. To have your complaint approved successfully make sure you fill out the details properly and don't spam it. Thank you for reaching us."
              )
              .subscribe(data => {
                console.log(data);
              });
        })
        .catch(err => {
          console.log('Something went wrong');
        });
    }
    
  }

  ngOnInit() {
  }

}
