import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'approved'
})
export class Approved implements PipeTransform {
    transform(items: any[]): any[] {
        if (!items) {
            return [];
        }
        return items.filter(item => {
            return item.approved == 'true';
        });    
    }
}
