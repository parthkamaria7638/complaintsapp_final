import { AngularFireDatabase } from 'angularfire2/database';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable()
export class EmailValidators {
    
    constructor(private db: AngularFireDatabase) {
    }

    public notAUniqueEmail = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let count = 0;
                this.db.list('/Users')
                    .subscribe(users => {
                        for(let i = 0; i < users.length; i++) {
                            if((control.value as string) == users[i].email) {
                                resolve({ notAUniqueEmail: true });
                                count++;
                            }
                        }
                        if (count == 0)
                            resolve(null);
                    });
            }, 1000);
        });
    }

    public notARegEmail = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let count = 0;
                this.db.list('/Users')
                    .subscribe(users => {
                        for(let i = 0; i < users.length; i++) {
                            if((control.value as string) == users[i].email) {
                                count++;
                            }
                        }
                        if (count == 0) {
                            resolve({ notARegEmail: true });
                        }
                        if (count != 0)
                            resolve(null);
                    });
            }, 1000);
        });
    }
}