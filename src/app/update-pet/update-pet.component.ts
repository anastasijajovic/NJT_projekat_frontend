import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Type } from '../model/Type';
import { ActivatedRoute, Router } from '@angular/router';
import { petService } from '../services/petService';
import { typeService } from '../services/typeService';
import { HttpResponse } from '../network/HttpResponse';
import { Pet } from '../model/Pet';
import { PetImage } from '../model/PetImage';
import { petImageService } from '../services/petImageService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.component.html',
  styleUrls: ['./update-pet.component.css']
})
export class UpdatePetComponent {

  public updatePetForm!: FormGroup;
  public types!: Type[];
  receivedInput!: number;
  public pet1!: Pet;
  public pets!: Pet[];
  selectedImages: File[] = [];
  primaryImageIndex: number = 0;

  public existingImages: PetImage[] = [];
  public backendUrl = environment.backendServerUrl;

  constructor(
    private route: ActivatedRoute,
    private petService: petService,
    private typeService: typeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private petImageService: petImageService,
  ) {

    // Kreiranje forme
    this.updatePetForm = formBuilder.group({
      petId: new FormControl(),
      petName: new FormControl('', Validators.required),
      petType: new FormControl('', Validators.required),
      petGender: new FormControl('', Validators.required),
      petAge: new FormControl('', Validators.required),
      petDescription: new FormControl(),
      petImage: new FormControl(),
    });


    // Uzimanje ID-a iz rute
    this.route.params.subscribe((params) => {
      this.receivedInput = params['input'];
      this.loadExistingImages();
    });


    // Uzimanje tipova
    this.typeService.getAll().subscribe({
      next: (response: HttpResponse) => {
        this.types = response.data.values as Type[];
      }
    });


    // Uzimanje svih petova i pronalazak onog koji se menja
    this.petService.getAll().subscribe((response) => {

      this.pets = response.data.values as Pet[];

      this.pets.forEach(element => {

        if (element.id == this.receivedInput) {

          this.pet1 = element;

          // Popunjavanje forme postojecim podacima
          this.updatePetForm.patchValue({
            petId: this.pet1.id,
            petName: this.pet1.name,
            petType: this.pet1.type.id,
            petGender: this.pet1.gender,
            petAge: this.pet1.age,
            petDescription: this.pet1.description,
            petImage: this.pet1.image
          });

        }

      });

    });

  }


  loadExistingImages() {
    this.petImageService.getImages(this.receivedInput).subscribe((res: any) => {
      this.existingImages = res.data.values;
    });
  }


  setPrimary(imageId: number) {
    this.petImageService.setPrimaryImage(imageId).subscribe({
      next: () => {
        this.existingImages.forEach(img => {
          img.primaryImage = (img.id === imageId);
        });
      },
      error: () => {
        alert("Neuspešno postavljanje primarne slike.");
      }
    });
  }


  updatePet() {

    if (!this.updatePetForm.valid) {
      alert("All fields are required!");
      return;
    }

    const formValue = this.updatePetForm.value;

    const pet = new Pet();
    pet.id = this.receivedInput;
    pet.name = formValue.petName;
    pet.type = this.types.find(t => t.id == formValue.petType) as Type;
    pet.gender = formValue.petGender;
    pet.age = formValue.petAge;
    pet.description = formValue.petDescription;
    pet.image = formValue.petImage;
    pet.status = this.pet1.status;
    this.petService.updatePet(pet).subscribe({
      next: (res) => {
        if (this.selectedImages.length > 0) {
          this.petImageService.uploadImages(
            Number(this.receivedInput),
            this.selectedImages,
            this.primaryImageIndex
          ).subscribe({
            next: () => {
              alert("Pet has been successfully updated!");
              this.router.navigate(['/pets']);
            },
            error: () => {
              alert("Pet info updated, but image upload failed.");
              this.router.navigate(['/pets']);
            }
          });
        } else {
          alert("Pet has been successfully updated!");
          this.router.navigate(['/pets']);
        }
      },
      error: () => {
        alert("Something went wrong while updating the pet.");
      }
    });
  }

  public newImagePreviews: string[] = [];

  selectImages(event: any) {
    // oslobodi stare object URL-ove da ne cure memorija
    this.newImagePreviews.forEach(url => URL.revokeObjectURL(url));

    this.selectedImages = Array.from(event.target.files);
    this.newImagePreviews = this.selectedImages.map(file => URL.createObjectURL(file));
  }


  setPrimaryNewImage(index: number) {

    this.primaryImageIndex = index;

  }
}
