import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeService {

  Employees;

  constructor(private db: AngularFireDatabase) { 
    this.db.list('/employee')
      .subscribe(emp => {
        this.Employees = emp;
      });
  }

  assignToEmployee(dept: string, compID: string) {
    console.log("1");
    console.log(dept);
    console.log(compID);
    var filteredEmployees = this.filterEmployees(dept);
    console.log(filteredEmployees);
    var minWorkEmpID = this.findMinWorkEmpID(filteredEmployees);
    console.log(minWorkEmpID)
    this.db.list('/employee/' + minWorkEmpID).subscribe(data => {
      let works = data['assignedWorks'];
      console.log(works);
      for(let i = 0; i < data.length; i++) {
        if (data[i].$key == 'assignedWorks') {
          let works = data[i];
          console.log(data[i]);
          console.log(data[i].$value);
        }
      }
    });
  }

  filterEmployees(dept: string) {
    console.log("2");
    var result = [];
    for(let i = 0; i < this.Employees.length; i++) {
      // console.log("#########");
      // console.log(this.Employees[i].role.replace('Dept', ''));
      // console.log(dept);
      // console.log("#########");
      if (this.Employees[i].role.replace('Dept', '') == dept.replace(/\s/g, "")) {
        result.push(this.Employees[i]);
      }
    }
    return result
  }

  findMinWorkEmpID(emps: any[]) {
    console.log("3");
    let id = '';
    let minWork = 10000000000000000;
    for(let i = 0; i < emps.length; i++) {
      if (emps[i].assignedWorks.length <= minWork) {
        id = emps[i].$key;
        minWork = emps[i].assignedWorks.length;
      }
    }
    console.log("4");
    return id;
  }

}
