import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-regcomplaints',
  templateUrl: './regcomplaints.component.html',
  styleUrls: ['./regcomplaints.component.css'],
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
export class RegcomplaintsComponent implements OnInit {

  complaints;
  showSpinner: boolean = true;
  currTime: number = new Date().getTime();

  constructor(db: AngularFireDatabase) { 
    db.list('/twittercomplaints')
      .subscribe(data => {
        this.complaints = data;
        this.showSpinner = false;
      });
      setInterval(() => {
        this.currTime = new Date().getTime();
      }, 1000);
  }

  ngOnInit() {
  }

}
