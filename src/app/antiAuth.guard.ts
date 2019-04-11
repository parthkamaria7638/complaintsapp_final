import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AntiAuthGuard implements CanActivate {
    constructor(
        private auth: AuthServiceService, 
        private router: Router,
        private fmService: FlashMessagesService
    ) {}

    canActivate() {
        this.auth.appUser$.subscribe(appUser => {
            if (appUser) {
                // this.fmService.show('You are already logged in. Logout to signup/signin into other account', { cssClass: 'flashMessage flash-danger', timeout: 3000 });
                this.router.navigate(['/']);
                return false;
            } else {
                return true;
            }
          });

          return true;

    }
}
