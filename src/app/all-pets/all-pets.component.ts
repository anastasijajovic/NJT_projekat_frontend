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

  searchText = "";
  selectedType = "All";
  selectedGender = "All";

  constructor(private petService: petService, private router: Router){}

  ngOnInit(){

    this.petService.getAll().subscribe({

      next:(response: HttpResponse)=>{

        this.pets = response.data.values as Pet[];

        this.filteredPets = this.pets;

      }

    })

  }

  deletePet(p:Pet){

    this.petService.delete(p.id).subscribe((res)=>{

      alert(res.message);

      this.pets = this.pets.filter(x=>x.id!=p.id);

      this.filterPets();

    });

  }

  filterPets(){

    this.filteredPets = this.pets.filter(p=>{

      const matchesName =
        p.name.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesType =
        this.selectedType=="All" ||
        p.type.name==this.selectedType;

      const matchesGender =
        this.selectedGender=="All" ||
        p.gender==this.selectedGender;

      return matchesName && matchesType && matchesGender;

    });

  }

}
