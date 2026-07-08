import { Component, EventEmitter, Input } from '@angular/core';
import { Pet } from '../model/Pet';
import { Adoption } from '../model/Adoption';
import { Router } from '@angular/router';
import { petImageService } from '../services/petImageService';
import { userService } from '../services/userService';
import { personService } from '../services/personService';
import { adoptionService } from '../services/adoptionService';
import { environment } from 'src/environments/environment';

@Component({
  selector:'app-pet-card',
  templateUrl:'./pet-card.component.html',
  styleUrls:['./pet-card.component.css']
})
export class PetCardComponent{

  @Input()
  pet!:Pet;

  @Input()
  removedPet!:EventEmitter<Pet>;

  public images:string[]=[];
  public currentImage:number=0;

  constructor(
    private router:Router,
    private petImageService:petImageService,
    public userService:userService,
    public personService:personService,
    private adoptionService:adoptionService
  ){}

  ngOnInit(){
    this.petImageService.getImages(this.pet.id)
      .subscribe((res:any)=>{
        let data=res.data.values;

        if(data.length>0){
          this.images = data.map((x:any)=> environment.backendServerUrl + x.image);
          this.currentImage = data.findIndex((x:any)=>x.primaryImage);

          if(this.currentImage === -1){
            this.currentImage = 0;
          }
        }else{
          this.images=[environment.backendServerUrl + this.pet.image];
        }
      });
  }

  nextImage(){
    if(this.currentImage < this.images.length-1){
      this.currentImage++;
    }
  }

  previousImage(){
    if(this.currentImage>0){
      this.currentImage--;
    }
  }

  update(id:Number){
    this.router.navigate(['/update_pet', id]);
  }

  delete(id:Number){
    this.removedPet.emit(this.pet);
  }

  adopt(id:Number){
    const person = this.personService.getSpesificPerson();

    if(!person){
      alert("You need to be logged in to request an adoption.");
      return;
    }

    const adoption = new Adoption();
    adoption.petId = this.pet;
    adoption.personId = person;
    adoption.date = new Date();
    adoption.vetReport = '';
    adoption.status = 0; // adjust to whatever "pending" is in your backend's status enum/int mapping

    this.adoptionService.addNewAdoption(adoption).subscribe({
      next: () => {
        alert("Adoption request sent!");
      },
      error: () => {
        alert("Something went wrong while requesting adoption.");
      }
    });
  }
}
