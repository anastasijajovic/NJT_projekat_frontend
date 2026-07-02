import { Component, EventEmitter, Input, Output } from '@angular/core';
import { petService } from '../services/petService';
import { Router } from '@angular/router';
import { Pet } from '../model/Pet';
import { userService } from '../services/userService';
import { personService } from '../services/personService';
import { adoptionService } from '../services/adoptionService';
import { Adoption } from '../model/Adoption';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent {

  @Input() pet!: Pet;
  @Output() removedPet = new EventEmitter<Pet>();
  public pipe = new DatePipe('en-Us');

  constructor(private petService: petService, private router:Router, public userService: userService, public personService: personService, public adoptionService: adoptionService){}

  delete(id: Number){
    if(this.pet.status==0){
      alert("This pet can't be deleted!")
    }else{
      this.removedPet.emit(this.pet);
    }
  }

  update(id:Number){
    this.router.navigate(['/update_pet', id]);
  }

  adopt(id:Number){
    const adoption = new Adoption();
    adoption.personId=this.personService.getSpesificPerson();
    adoption.petId= this.pet;
    adoption.status = 0;
    adoption.vetReport="Animal is in good condition";
    adoption.date= new Date();
    console.log(this.personService.getSpesificPerson());
    console.log(new Date);
    this.adoptionService.addNewAdoption(adoption).subscribe((res)=>{
      console.log(res);
      alert("Request for adoption has been sent!");
    });
  }
}
