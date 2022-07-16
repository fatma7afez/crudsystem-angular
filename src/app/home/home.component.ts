import { BOOKLIST } from './../shared/bookList';
import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, DoCheck {
  phoneBookForm: FormGroup = new FormGroup({});
  phoneBookDta: BOOKLIST[] = [];
  editedPhoneBookDta: BOOKLIST;
  phoneBookDataId: number;
  isUpdated:boolean= false
  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }
  ngDoCheck(): void {
    this.onCheckBookData();
  }

  initForm() {
    this.phoneBookForm = new FormGroup({
      nameBook: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(7),
      ]),
      numberBook: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(002)?(02|01)?[01253]?[0-9]{8}$/),
      ]),
    });
  }

  onSubmit() {
    let user: BOOKLIST = {
      nameBook: this.phoneBookForm.value.nameBook,
      numberBook: this.phoneBookForm.value.numberBook,
    };

    this.phoneBookDta.push(user);
    this.onSaveBookData(this.phoneBookDta);
    this.phoneBookForm.reset()
  }

  onSaveBookData(phoneBookDta: object) {
    let phonesDta = JSON.stringify(phoneBookDta);
    localStorage.setItem('phonesData', phonesDta);
  }

  onCheckBookData() {
    if (localStorage.getItem('phonesData') != null) {
      let phoneBookDta = JSON.parse(localStorage.getItem('phonesData') || '{}');
      this.phoneBookDta = phoneBookDta;
    }
  }

  onGetEditPhoneBook(data: BOOKLIST) {
    this.editedPhoneBookDta = data;
    this.onSetphoneBookData();
  }

  onGetEditPhoneBookID(id: number) {
    return (this.phoneBookDataId = id);
  }

  onSetphoneBookData() {
    this.initForm();
    this.isUpdated= true
    this.phoneBookForm.patchValue({
      nameBook: this.editedPhoneBookDta.nameBook,
      numberBook: this.editedPhoneBookDta.numberBook,
    });
  }

  onUpdatePhoneData() {
    const userData = this.phoneBookForm.controls;
    let user: BOOKLIST = {
      nameBook: this.phoneBookForm.value.nameBook,
      numberBook: this.phoneBookForm.value.numberBook,
    };
    this.onSaveNewBookData(user)
    
  }

  onSaveNewBookData(user:BOOKLIST)
  {
    this.phoneBookDta[this.phoneBookDataId].nameBook = user.nameBook;
    this.phoneBookDta[this.phoneBookDataId].numberBook = user.numberBook;
    this.onSaveBookData(this.phoneBookDta);
    this.phoneBookForm.reset();
    this.isUpdated= false;
  }
}

