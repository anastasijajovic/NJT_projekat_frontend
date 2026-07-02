import { Component } from '@angular/core';
import {  EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from '../model/Person';
import { personService } from '../services/personService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent {

  @Input() person!: Person;
  @Output() removedPerson = new EventEmitter<Person>();

  constructor(private personService: personService, private router: Router){}

  delete(jmbg: String){
    // console.log(jmbg);
    // this.personService.deletePerson(jmbg).subscribe((res)=>{
    //   console.log(res);
    //   alert([res.message]);
      this.removedPerson.emit(this.person);
    // })
  }

  update(jmbg: String){
    this.router.navigate(['/update_person', jmbg]);
  }
}
