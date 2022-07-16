import { BOOKLIST } from './../shared/bookList';
import {
  Component,
  OnInit,
  DoCheck,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, DoCheck {
  isphoneBookData: BOOKLIST[] = [];
  name:string ='';
  @Output() editedPhoneBook = new EventEmitter<BOOKLIST>();
  @Output() phoneBookId = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.displayDta();
  }

  displayDta() {
    if (localStorage.getItem('phonesData') != null) {
      let phoneBookDta = JSON.parse(localStorage.getItem('phonesData') || '{}');
      this.isphoneBookData = phoneBookDta;
    }
  }

  onDeleteBookDta(i: number) {
    this.isphoneBookData.splice(i, 1);
    this.onSaveBookData(this.isphoneBookData);
  }

  onSaveBookData(phoneBookDta: BOOKLIST[]) {
    let phonesDta = JSON.stringify(phoneBookDta);
    localStorage.setItem('phonesData', phonesDta);
  }

  onEditBookDta(i: number, phoneDta: BOOKLIST) {
    this.phoneBookId.emit(i);
    this.editedPhoneBook.emit(phoneDta);
  }

  //until display a new array 
  // onSearchNameBook(name: any) {
  //   let nameValue = name.target.value;
  //   this.isphoneBookData = this.isphoneBookData.filter((item) => {
  //     return item.nameBook.toLowerCase().includes(nameValue.toLowerCase());
  //   });
  // }

  //  data:any;
  //  onSearchNameBook(name: any):BOOKLIST[] {
  //   let nameValue = name.target.value;
  //    for(let i = 0 ; i< this.isphoneBookData.length;i++)
  //    {
  //     if(this.isphoneBookData[i].nameBook.toLowerCase().includes(nameValue.toLowerCase()))
  //     {
  //       console.log(this.isphoneBookData[i])
  //       this.data = this.isphoneBookData[i]
  //     }
  //    }     
  //    return  this.isphoneBookData = this.data;
  // }

}
