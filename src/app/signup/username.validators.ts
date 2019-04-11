import { AngularFireDatabase } from 'angularfire2/database';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable()
export class UsernameValidators {
    
    constructor(private db: AngularFireDatabase) {
    }

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0)
            return { cannotContainSpace: true };

        return null;
    }

    public notAUniqueUsername = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let count = 0;
                this.db.list('/Users')
                    .subscribe(users => {
                        for(let i = 0; i < users.length; i++) {
                            if((control.value as string) == users[i].username) {
                                resolve({ notAUniqueUsername: true });
                                count++;
                            }
                        }
                        if (count == 0)
                            resolve(null);
                    });
            }, 1000);
        });
    }
}