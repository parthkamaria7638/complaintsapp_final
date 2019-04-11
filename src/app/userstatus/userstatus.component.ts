import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'userstatus',
  templateUrl: './userstatus.component.html',
  styleUrls: ['./userstatus.component.css']
})
export class UserstatusComponent implements OnInit {
  @Input() status: string;

  constructor() { }

  ngOnInit() {
  }

}
