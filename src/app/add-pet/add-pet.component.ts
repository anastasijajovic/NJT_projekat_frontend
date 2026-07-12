import { Component } from '@angular/core';
import { petService } from '../services/petService';
import { typeService } from '../services/typeService';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pet } from '../model/Pet';
import { Type } from '../model/Type';
import { HttpResponse } from '../network/HttpResponse';
import { Router } from '@angular/router';
import { petImageService } from '../services/petImageService';


@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {


  public newPetForm!: FormGroup;
  public types!: Type[];


  // slike
  public selectedImages: File[] = [];

  // koja slika je glavna
  public primaryImageIndex: number = 0;



  constructor(
    private petService: petService,
    private typeService: typeService,
    private petImageService: petImageService,
    private formBuilder: FormBuilder,
    private router: Router
  ){


    this.newPetForm = formBuilder.group({

      petId: new FormControl(),

      petName: new FormControl('', Validators.required),

      petType: new FormControl('', Validators.required),

      petGender: new FormControl('', Validators.required),

      petAge: new FormControl('', Validators.required),

      petDescription: new FormControl('', Validators.required),

      petImage: new FormControl()

    });

  }



  ngOnInit(){


    this.typeService.getAll().subscribe({

      next:(response:HttpResponse)=>{

        this.types = response.data.values as Type[];

      }

    })

  }



  // izbor slika

  selectImages(event:any){


    this.selectedImages =
      Array.from(event.target.files);


    this.primaryImageIndex = 0;


  }



  // izbor primarne slike

  setPrimary(index:number){

    this.primaryImageIndex = index;

  }




  public addPet(){


    if(!this.newPetForm.valid){

      alert("All fields are required!");

      return;

    }


    const pet = new Pet();


    pet.name =
      this.newPetForm.get('petName')!.value;



    let type = new Type();


    this.types.forEach(element=>{

      if(element.id ==
        this.newPetForm.get('petType')!.value){

        type = element;

      }

    });



    pet.type = type;


    pet.gender =
      this.newPetForm.get('petGender')!.value;


    pet.description =
      this.newPetForm.get('petDescription')!.value;


    pet.age =
      Number(this.newPetForm.get('petAge')!.value);



    pet.status = 1;


    // za sada prazno
    pet.image = "";



    this.petService.addNew(pet).subscribe((res)=>{


      alert(res.message);



      /*
        Ovde moramo dobiti ID novog pet-a.
        Pošto tvoj backend trenutno ne vraća pet objekat,
        privremeno moramo napraviti mali poziv:
        uzmemo sve i nadjemo poslednjeg.
      */


      this.petService.getAll().subscribe((response)=>{


        let pets =
          response.data.values as Pet[];


        let lastPet =
          pets[pets.length-1];



        if(this.selectedImages.length > 0){


          this.petImageService.uploadImages(

            lastPet.id,

            this.selectedImages,

            this.primaryImageIndex

          ).subscribe(()=>{


            this.router.navigate(['/pets']);


          });


        }else{


          this.router.navigate(['/pets']);


        }



      });



    });


  }

}
