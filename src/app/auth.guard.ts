import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthServiceService, 
        private router: Router,
        private fmService: FlashMessagesService
    ) {}

    canActivate() {
        this.auth.appUser$.subscribe(appUser => {
            if (appUser) {
              return true;
            } else {
                // this.fmService.show('You must login to access this route', { cssClass: 'flashMessage flash-danger', timeout: 3000 });
                this.router.navigate(['/login']);
                return false;
            }
          });

          return true;

    }
    
}
