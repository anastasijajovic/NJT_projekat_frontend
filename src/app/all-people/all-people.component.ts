import { Component, EventEmitter, Input } from '@angular/core';
import { Person } from '../model/Person';
import { personService } from '../services/personService';
import { HttpResponse } from '../network/HttpResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-people',
  templateUrl: './all-people.component.html',
  styleUrls: ['./all-people.component.css']
})
export class AllPeopleComponent {

  @Input() removedPerson!: EventEmitter<Person>;
  public people!: Person[];
  public filteredPeople: Person[] =[];

  constructor(private personService: personService, private router: Router){}

  ngOnInit(){
    this.personService.getAll().subscribe({
      next:(response: HttpResponse)=>{

        this.people = response.data.values as Person[];
        this.filteredPeople = this.people;
      }
    })
  }

  onSearch(search: String){
    if(!search){
      this.filteredPeople=this.people;
    }else{
      this.personService.searchPeople(search).subscribe((res)=>{
        this.filteredPeople = res.data.values as Person[];
      })
    }
  }

  deletePerson(p:Person){
    this.personService.deletePerson(p.jmbg).subscribe((res)=>{
      console.log(res);
      alert([res.message]);

        this.people.forEach((element,index)=>{
          if(element.jmbg==p.jmbg) this.people.splice(index,1);
       
    });

  });
}
}
