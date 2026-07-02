import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Type } from '../model/Type';
import { ActivatedRoute, Router } from '@angular/router';
import { petService } from '../services/petService';
import { typeService } from '../services/typeService';
import { HttpResponse } from '../network/HttpResponse';
import { Pet } from '../model/Pet';

@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.component.html',
  styleUrls: ['./update-pet.component.css']
})
export class UpdatePetComponent {

  public updatePetForm!: FormGroup;
  public types!: Type[];
  receivedInput!: Number;
  public pet1!: Pet;
  public pets!: Pet[];

  constructor(private route: ActivatedRoute,private petService: petService, private typeService: typeService, private formBuilder: FormBuilder, private router:Router){
    this.route.params.subscribe((params) => {
      this.receivedInput = params['input'];
      });
  
      this.typeService.getAll().subscribe({
        next:(response: HttpResponse)=>{
          this.types = response.data.values as Type[];
        }
      })
  
      this.petService.getAll().subscribe((response)=>{
        this.pets=response.data.values as Pet[];
        console.log("usao u uzimanje svih");
        console.log(this.receivedInput);
        console.log(this.pets);

        this.pets.forEach(element => {
          if(element.id==this.receivedInput){
            this.pet1=element;
            console.log("uzeta vrednost za pet1");
            console.log(this.pet1);
          }
        });
           
      });

      this.updatePetForm = formBuilder.group({
        petId: new FormControl(),
        petName: new FormControl('', Validators.required),
        petType: new FormControl('', Validators.required),
        petGender: new FormControl('', Validators.required),
        petAge: new FormControl('', Validators.required),
        petDescription: new FormControl(),
        petImage: new FormControl(),
      });
  }

  updatePet(){
    if(!this.updatePetForm.valid){
      alert("All fields are required!");
      return;
    }else{
      const pet = new Pet;

      pet.id=this.receivedInput;
      pet.name= this.updatePetForm.get('petName')!.value;
      var type = new Type;
      this.types.forEach(element => {
        if(element.id== this.updatePetForm.get('petType')!.value){
          type=element;
        }
      });
      pet.type= type;
      pet.gender= this.updatePetForm.get('petGender')!.value;
      pet.description= this.updatePetForm.get('petDescription')!.value;
      pet.age= Number(this.updatePetForm.get('petAge')!.value);
      pet.image= this.updatePetForm.get('petImage')!.value;
      console.log(pet.name);
      console.log(pet.id);

      this.petService.updatePet(pet).subscribe((res)=>{
        console.log(res);
        alert(res.message);
        this.router.navigate(['/pets']);
      })
    }
    
  }
}
