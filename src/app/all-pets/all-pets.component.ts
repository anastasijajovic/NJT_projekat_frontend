import { Component, EventEmitter, Input } from '@angular/core';
import { petService } from '../services/petService';
import { Pet } from '../model/Pet';
import { HttpResponse } from '../network/HttpResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.css']
})
export class AllPetsComponent {

  @Input() removedPet!: EventEmitter<Pet>;
  public pets!: Pet[];
  public filteredPets: Pet[] = [];

  constructor(private petService: petService, private router: Router){}

  ngOnInit(){
    this.petService.getAll().subscribe({
      next:(response: HttpResponse)=>{

        this.pets = response.data.values as Pet[];
        this.filteredPets=this.pets;
      }
    })
  }

  deletePet(p:Pet){
    this.petService.delete(p.id).subscribe((res)=>{
      console.log(res);
      alert([res.message]);

        this.pets.forEach((element,index)=>{
          if(element.id==p.id) this.pets.splice(index,1);
       
    });

  });
}



  onSearch(search: String){
    if(!search){
      this.filteredPets=this.pets;
    }else{
      //this.filteredPets= this.petService.searchPets(search) as Pet[];
      this.petService.searchPets(search).subscribe((res)=>{
        this.filteredPets = res.data.values as Pet[];
      })
    }
  }
}
