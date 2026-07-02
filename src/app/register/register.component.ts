import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { City } from '../model/City';
import { personService } from '../services/personService';
import { cityService } from '../services/cityService';
import { Router } from '@angular/router';
import { HttpResponse } from '../network/HttpResponse';
import { Person } from '../model/Person';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public newPersonForm!: FormGroup;
  public cities!: City[];

  constructor(private personService: personService, private cityService: cityService, private formBuilder: FormBuilder, private router:Router){


    this.newPersonForm = formBuilder.group({
      personJmbg: new FormControl('', Validators.required),
      personName: new FormControl('', Validators.required),
      personSurname: new FormControl('', Validators.required),
      personYear: new FormControl('', Validators.required),
      personPhone: new FormControl('', Validators.required),
      personCity: new FormControl('', Validators.required),
      personUsername: new FormControl('', Validators.required),
      personPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit(){
    this.cityService.getAll().subscribe({
      next:(response: HttpResponse)=>{

        this.cities = response.data.values as City[];
        
      }
    })
  }

  public addPerson(){
    if(!this.newPersonForm.valid){
      alert("All fields are required!");
      return;
    }else{
      const person = new Person;

      person.jmbg = this.newPersonForm.get('personJmbg')!.value;
      person.name = this.newPersonForm.get('personName')!.value;
      person.surname = this.newPersonForm.get('personSurname')!.value;
      person.phone_number = this.newPersonForm.get('personPhone')!.value;
      person.year_of_birth = this.newPersonForm.get('personYear')!.value;
      person.username = this.newPersonForm.get('personUsername')!.value;
      person.password = this.newPersonForm.get('personPassword')!.value;

      var city!: City;

      this.cities.forEach(element => {
        if(element.id==this.newPersonForm.get('personCity')!.value){
          city=element;
        }
        
      });
      person.city = city;

      this.personService.addNewPerson(person).subscribe((res)=>{
        console.log(res);
        alert("You successfully created an account!");
        this.router.navigate(['/login_guest']);
      })
    }
  }
}
