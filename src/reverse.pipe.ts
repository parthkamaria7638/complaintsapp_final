import { Pipe, PipeTransform } from '@angular/core';
import { filter, reverse } from 'lodash';

@Pipe({
  name: 'reverse'
})
export class Reverse implements PipeTransform {
    transform(items: any[]): any[] {
        if (!items) {
            return;
        }
        return reverse(items);
    }
}
