import { Component } from '@angular/core';
import { Adoption } from '../model/Adoption';
import { adoptionService } from '../services/adoptionService';
import { Router } from '@angular/router';
import { HttpResponse } from '../network/HttpResponse';
import { userService } from '../services/userService';
import { personService } from '../services/personService';
import { Person } from '../model/Person';
import { petService } from '../services/petService';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {

  public adoptions!: Adoption[];
  public adoption!: Adoption;
  public personAdoptions!: Adoption[];
  public jmbg!:String;
  public person!: Person;
  

  constructor(private adoptionService: adoptionService, private router: Router, public userService: userService, public personService:personService, public petService: petService){}

  ngOnInit(){
    this.adoptionService.getAdoptionStatus(0).subscribe({
      next:(response: HttpResponse)=>{
        this.adoptions = response.data.values as Adoption[];
      }
    })

    this.adoptionService.getPersonsAdoptions().subscribe((res)=>{
      this.personAdoptions = res.data.values as Adoption[];
    })
  }

  decline(id: Number){
    this.adoptions.forEach(element => {
      if(element.adoptionId==id){
        this.adoption=element;
      }
    });

    this.adoption.status = 2;

    this.adoptionService.updateAdoption(this.adoption).subscribe((res)=>{
      console.log(res);
    });
    
    this.adoptions.forEach((element,index)=>{
      if(element.adoptionId==this.adoption.adoptionId) this.adoptions.splice(index,1);
   
})
  }

  accept(id: Number){
    this.adoptions.forEach(element => {
      if(element.adoptionId==id){
        this.adoption=element;
      }
    });

    var pet = this.adoption.petId;
    pet.status=0;

    this.petService.updatePet(pet).subscribe((res)=>{
      console.log(res);
    })

     this.adoption.status = 1;

    this.adoptionService.updateAdoption(this.adoption).subscribe((res)=>{
      console.log(res);
    });
    
    this.adoptions.forEach((element,index)=>{
       if((element.petId.id==pet.id) && (element.adoptionId!==this.adoption.adoptionId)){
        element.status=2;
        this.adoptionService.updateAdoption(element).subscribe((res)=>{
          console.log(res);
        })
        
      }
    })
    this.adoptions = this.adoptions.filter( a => a.status ==0)
  }

}
