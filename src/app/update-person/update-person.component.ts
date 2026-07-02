import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../model/City';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { personService } from '../services/personService';
import { cityService } from '../services/cityService';
import { Person } from '../model/Person';
import { HttpResponse } from '../network/HttpResponse';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent {

  public updatePersonForm!: FormGroup;
  public cities!: City[];
  public people!: Person[];
  receivedInput!: String;
  public person1!: Person;
  // public isOk!:Number;
  

  constructor(private route: ActivatedRoute,private personService: personService, private cityService: cityService, private formBuilder: FormBuilder, private router:Router){
    // this.isOk=0;
    
    this.route.params.subscribe((params) => {
      this.receivedInput = params['input'];
      });
  
      this.cityService.getAll().subscribe({
        next:(response: HttpResponse)=>{
          this.cities = response.data.values as City[];
          
        }
      })
  
      this.personService.getAll().subscribe((response)=>{
        this.people=response.data.values as Person[];

        this.people.forEach(element => {
          if(element.jmbg===this.receivedInput){
            this.person1=element;
          }
        });
      })
   
    this.updatePersonForm = formBuilder.group({
      personJmbg: new FormControl(),
      personName: new FormControl('', Validators.required),
      personSurname: new FormControl('', Validators.required),
      personYear: new FormControl('', Validators.required),
      personPhone: new FormControl('', Validators.required),
      personCity: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    

    
  }

  updatePerson(){
    if(!this.updatePersonForm.valid){
      alert("All fields are required!");
      return;
    }else{
      const person = new Person;

      person.jmbg = this.receivedInput;
      person.name = this.updatePersonForm.get('personName')!.value;
      person.surname = this.updatePersonForm.get('personSurname')!.value;
      person.phone_number = this.updatePersonForm.get('personPhone')!.value;
      person.year_of_birth = this.updatePersonForm.get('personYear')!.value;

      var city!: City;

      this.cities.forEach(element => {
        if(element.id==this.updatePersonForm.get('personCity')!.value){
          city=element;
        }
        
      });
      person.city = city;

      this.personService.updatePerson(person).subscribe((res)=>{
        console.log(res);
        alert(res.message);
        this.router.navigate(["/people"]);

      });

      // this.isOk=1;
      
    }
  }
}
