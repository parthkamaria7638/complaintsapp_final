import { FlashMessagesService } from 'angular2-flash-messages';
import { EmailValidators } from './../signup/email.validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email_: string;
  pass_: string;
  showSpinner: boolean = false;
  message = '';

  constructor(private auth: AuthServiceService,
    private emailValidator: EmailValidators,
    private router: Router,
    private flashMessagesService: FlashMessagesService
    ) { }

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email, 
    ],
    this.emailValidator.notARegEmail
    ),
    password: new FormControl('', Validators.required)
  });


  login() {
    this.showSpinner = true;
    localStorage.setItem("signup", "false");
    this.auth.login(this.email.value, this.password.value)
      .then(user => {
        this.showSpinner = false;
        this.flashMessagesService.show('Successfully logged in', { cssClass: 'flashMessage flash-success', timeout: 2000 });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      })
      .catch(err => {
        this.showSpinner = false;
        this.flashMessagesService.show('Incorrect Password', { cssClass: 'flashMessage flash-danger', timeout: 3000 });
        this.message = 'Incorrect Password';
        console.log(err);
      });
  }

  ngOnInit() {
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

}
