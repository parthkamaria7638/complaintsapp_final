import { Pipe, PipeTransform } from '@angular/core';
import { filter, reverse } from 'lodash';

@Pipe({
  name: 'searchemp'
})
export class SearchEmp implements PipeTransform {
    transform(items: any[], searchText: String): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter((item) => {
            return item.name.toLowerCase().includes(searchText);
        });
    }
}