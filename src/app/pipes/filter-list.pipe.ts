import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterListPipe implements PipeTransform {
  transform(searchArray: any[], searchText: string, searchableFields: string[]): any[] {
    if (!searchArray) return [];
    if (!searchText) return searchArray;
    searchText = searchText.toLowerCase();
    return searchArray.filter(searchItem => {
      let returnable = false;
      searchableFields.forEach(searchableKey => {
        returnable = returnable || searchItem[searchableKey].toLowerCase().includes(searchText);
      });
      return returnable;
    });
  }
}
