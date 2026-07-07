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

  constructor(
    private route: ActivatedRoute,
    private personService: personService,
    private cityService: cityService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    // Kreiranje forme - ZAKLJUČAVAMO username i password (disabled: true)
    this.updatePersonForm = formBuilder.group({
      personJmbg: new FormControl({ value: '', disabled: true }),
      personName: new FormControl('', Validators.required),
      personSurname: new FormControl('', Validators.required),
      personUsername: new FormControl({ value: '', disabled: true }, Validators.required),
      personPassword: new FormControl({ value: '', disabled: true }, Validators.required),
      personYear: new FormControl('', Validators.required),
      personPhone: new FormControl('', Validators.required),
      personCity: new FormControl('', Validators.required)
    });

    // Dobijanje JMBG-a iz rute
    this.route.params.subscribe((params) => {
      this.receivedInput = params['input'];
    });

    // Dobijanje gradova
    this.cityService.getAll().subscribe({
      next: (response: HttpResponse) => {
        this.cities = response.data.values as City[];
      }
    });

    // Dobijanje osoba
    this.personService.getAll().subscribe((response) => {
      this.people = response.data.values as Person[];

      this.people.forEach(element => {
        if (element.jmbg === this.receivedInput) {
          this.person1 = element;

          // Popunjavanje postojece forme
          this.updatePersonForm.patchValue({
            personJmbg: this.person1.jmbg,
            personName: this.person1.name,
            personSurname: this.person1.surname,
            personUsername: this.person1.username,
            personPassword: this.person1.password,
            personYear: this.person1.year_of_birth,
            personPhone: this.person1.phone_number,
            personCity: this.person1.city.id
          });

          console.log("Pronadjena osoba:");
          console.log(this.person1);
        }
      });
    });
  }

  updatePerson() {

    if (!this.updatePersonForm.valid) {
      alert("All fields are required!");
      return;
    } else {

      const person = new Person();

      person.jmbg = this.receivedInput;
      person.name = this.updatePersonForm.get('personName')!.value;
      person.surname = this.updatePersonForm.get('personSurname')!.value;

      // Umesto iz forme, preuzimamo originalne podatke koje smo učitali iz baze
      person.username = this.person1.username;
      person.password = this.person1.password;

      person.phone_number = this.updatePersonForm.get('personPhone')!.value;
      person.year_of_birth = this.updatePersonForm.get('personYear')!.value;

      let city!: City;

      this.cities.forEach(element => {
        if (element.id == this.updatePersonForm.get('personCity')!.value) {
          city = element;
        }
      });

      person.city = city;

      this.personService.updatePerson(person).subscribe({
        next: (res) => {
          console.log('Update successful:', res);
          alert(res.message ? res.message : 'Person successfully updated!');
          this.router.navigate(["/people"]);
        },
        error: (err) => {
          console.error('Update failed. Server responded with:', err);
          alert('Failed to update person. Check the console for details.');
        }
      });
    }
  }
}
