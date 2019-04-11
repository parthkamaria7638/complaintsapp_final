import { AngularFireDatabase } from 'angularfire2/database';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable()
export class PhoneNumberValidator {
    
    constructor(private db: AngularFireDatabase) {
    }

    static isNotANum(control: AbstractControl): ValidationErrors | null {
        const regEx = /^\d+$/
        if (!regEx.test(control.value as string))
         return {isNotANum: true}
        else  null;
    }

    
}