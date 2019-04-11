import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'unanalysed'
})
export class Unanalysed implements PipeTransform {
    transform(items: any[]): any[] {
        if (!items) {
            return [];
        }
        return items.filter(item => {
            return (item.approved == 'false'|| item.approved == 'pending');
        });
    }
}
