import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  Employees;
  showSpinner: boolean = true;
  searchText: string;

  constructor(private db: AngularFireDatabase) {
    this.db.list('/employee') 
      .subscribe(emp => {
        this.Employees = emp;
        this.showSpinner = false;
      });
  }

  ngOnInit() {
  }

}
