import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pet } from '../model/Pet';
import { Person } from '../model/Person';
import { adoptionService } from '../services/adoptionService';
import { petService } from '../services/petService';
import { personService } from '../services/personService';
import { HttpResponse } from '../network/HttpResponse';
import { Adoption } from '../model/Adoption';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-adoption',
  templateUrl: './add-adoption.component.html',
  styleUrls: ['./add-adoption.component.css']
})
export class AddAdoptionComponent {
    
  public newAdoptionForm!: FormGroup;
  public pets!: Pet[];
  public people!: Person[];


  constructor(private adoptionService: adoptionService, private petService: petService, private personService: personService, private formBuilder: FormBuilder, private router: Router){



    this.newAdoptionForm = formBuilder.group({
      adoptionId: new FormControl(),
      adoptionDate: new FormControl(new Date(), Validators.required),
      adoptionVetReport: new FormControl('', Validators.required),
      adoptionPet: new FormControl('', Validators.required),
      adoptionPerson: new FormControl('', Validators.required)
    });
  }

  ngOnInit(){
    this.petService.getWithStatus(1).subscribe({
      next:(response: HttpResponse)=>{
        this.pets = response.data.values as Pet[];
      }
    })

    this.personService.getAll().subscribe({
      next:(response: HttpResponse)=>{
        this.people = response.data.values as Person[];
      }
    })
  }

  public addAdoption(){
    if(!this.newAdoptionForm.valid){
      alert("All fields are required!");
      return;
    }else{
      const adoption = new Adoption;

      adoption.date= this.newAdoptionForm.get('adoptionDate')!.value;
      adoption.vetReport = this.newAdoptionForm.get('adoptionVetReport')!.value;

      var pet = new Pet;
      this.pets.forEach(element => {
        if(element.id== this.newAdoptionForm.get('adoptionPet')!.value){
          pet=element;
        }
      });
      pet.status=0;

      this.petService.updatePet(pet).subscribe((res)=>{
        console.log(res);
      })

      adoption.petId=pet;
      
      var person = new Person;
      this.people.forEach(element => {
        if(element.jmbg== this.newAdoptionForm.get('adoptionPerson')!.value){
          person=element;
        }
      });
      adoption.personId=person;

      adoption.status = 1;

      this.adoptionService.addNewAdoption(adoption).subscribe((res)=>{
        console.log(res);
        alert(res.message);
        this.router.navigate(['/adoptions']);
      })
    }
  }
}
