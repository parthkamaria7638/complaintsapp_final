import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removedept'
})
export class RemoveDept implements PipeTransform {
    transform(name: string): string {
        if (!name) {
            return;
        }
        return name.replace('Dept', '');
    }
}
