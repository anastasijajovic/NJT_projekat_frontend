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

  delete(jmbg: String) {
    this.personService.deletePerson(jmbg).subscribe({
      next: (res) => {
        this.removedPerson.emit(this.person);
      },
      error: (err) => {
        console.error('Server error:', err);
        alert('This person cannot be deleted because they have associated adoptions.');
      }
    });
  }

  update(jmbg: String){
    this.router.navigate(['/update_person', jmbg]);
  }
}
