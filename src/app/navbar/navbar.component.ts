import { AuthServiceService } from './../auth-service.service';
import { AppUser } from './../Models/app-user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: AppUser;

  constructor(private auth: AuthServiceService) { 
    console.log(this.user);
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.user = appUser);
  }

  logout() {
    localStorage.removeItem("signup");
    this.auth.logout();
  }

}
