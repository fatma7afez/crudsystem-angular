import { BOOKLIST } from './shared/bookList';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchName'
})
export class SearchNamePipe implements PipeTransform {

  transform(phoneBookData: BOOKLIST[] ,name: any): BOOKLIST[] {
    if(!name) return  phoneBookData
    return phoneBookData.filter((dta)=>{
      return dta.nameBook.toLowerCase().includes(name.toLowerCase())
    })
  }

}
