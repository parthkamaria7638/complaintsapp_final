import { EmailValidators } from './email.validators';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validators';
import { PhoneNumberValidator } from './phoneNo.validators';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userDB;
  showSpinner: boolean = false;

constructor(private auth: AuthServiceService,
  private db: AngularFireDatabase,
  private router: Router,
  private usernameValidator: UsernameValidators,
  private emailValidator: EmailValidators,
  private flashMessagesService: FlashMessagesService
  ) { }

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ],
    this.emailValidator.notAUniqueEmail
    ),
    username: new FormControl('', [
      Validators.required,
      UsernameValidators.cannotContainSpace,
      Validators.minLength(6)
    ],
    this.usernameValidator.notAUniqueUsername),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      PhoneNumberValidator.isNotANum
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  

  signUp() {
    this.showSpinner = true;
    localStorage.setItem("signup", "true");
      this.auth.signup(this.email.value, this.password.value)
      .then(user => {
        //console.log(user);
        //console.log(this.username_)
        this.showSpinner = false;
        this.userDB = {
          email: user.email,
          role: "employee",
          username: this.username.value,
          phoneNo: this.phoneNo.value
        } 
        this.db.object('/Users/' + user.uid)
          .update(this.userDB)
            .then(user => {
              console.log(user);
              this.showSpinner = false;
              this.flashMessagesService.show('Account created successfully', { cssClass: 'flashMessage flash-success', timeout: 2000 });
              setTimeout(() => {
                this.router.navigate(['login']);
              }, 2000);
              
            })
            .catch(err => {
              this.flashMessagesService.show('Something went wrong', { cssClass: 'flashMessage flash-danger', timeout: 2000 });
              console.log(err);
            });
      })
      .catch(err => {
        console.log(err);
      });  
    } 

  get username() {
    return this.form.get('username'); 
  }

  get email() {
    return this.form.get('email'); 
  }

  get password() {
    return this.form.get('password'); 
  }

  get phoneNo() {
    return this.form.get('phoneNo'); 
  }

  ngOnInit() {
  }

}
