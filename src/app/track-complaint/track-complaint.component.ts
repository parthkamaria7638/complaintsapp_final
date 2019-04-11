import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-complaint',
  templateUrl: './track-complaint.component.html',
  styleUrls: ['./track-complaint.component.css']
})
export class TrackComplaintComponent implements OnInit {


  id;
  constructor(
    private Route: ActivatedRoute
  ) { 
    this.id = this.Route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
