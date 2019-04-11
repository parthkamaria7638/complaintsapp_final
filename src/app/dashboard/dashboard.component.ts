import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
// import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  canvas: any;
  ctx: any;
  twitterComplaints: number = 0;
  redditComplaints: number = 0;
  facebookComplaints: number = 0;
  
  constructor(private db: AngularFireDatabase) {
    // this.db.list('twittercomplaints')
    //   .subscribe(data => {
    //     this.twitterComplaints = data.length;
    //   });
    // this.db.list('redditcomplaints')
    //   .subscribe(data => {
    //     this.redditComplaints = data.length;
    //   });
    // this.db.list('fbComplaints')
    //   .subscribe(data => {
    //     this.facebookComplaints = data.length;
    //   });
      
   }

  // ngAfterViewInit() {
  //   this.canvas = document.getElementById('myChart');
  //   this.ctx = this.canvas.getContext('2d');
  //   let myChart = new Chart(this.ctx, {
  //     type: 'pie',
  //     data: {
  //         labels: ["Twitter", "Reddit", "Facebook"],
  //         datasets: [{
  //             label: '# of complaints',
  //             data: [this.twitterComplaints,this.redditComplaints,this.facebookComplaints],
  //             backgroundColor: [
  //                 'rgba(29, 202, 255, 1)',
  //                 'rgba(255, 67, 1, 1)',
  //                 'rgba(59, 89, 152, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //       responsive: false,
  //     }
  //   });
  // }

  ngOnInit() {
  }

  // increaseCom() {
  //   this.twitterComplaints++;
  // }

}
