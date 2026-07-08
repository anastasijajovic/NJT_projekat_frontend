import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { City } from '../model/City';
import { personService } from '../services/personService';
import { cityService } from '../services/cityService';
import { registrationService } from '../services/registrationService';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '../network/HttpResponse';
import { Person } from '../model/Person';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public newPersonForm!: FormGroup;
  public cities!: City[];

  public token!: string;
  public email!: string;
  public tokenValid = false;
  public tokenChecked = false;
  public errorMessage = '';

  constructor(
    private personService: personService,
    private cityService: cityService,
    private registrationService: registrationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

    this.newPersonForm = formBuilder.group({
      personJmbg: new FormControl('', Validators.required),
      personName: new FormControl('', Validators.required),
      personSurname: new FormControl('', Validators.required),
      personYear: new FormControl('', Validators.required),
      personPhone: new FormControl('', Validators.required),
      personCity: new FormControl('', Validators.required),
      personPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;

    this.registrationService.validateToken(this.token).subscribe({
      next: (response: HttpResponse) => {
        this.tokenChecked = true;

        if (response.status == 'BAD_REQUEST') {
          this.tokenValid = false;
          this.errorMessage = response.message;
          return;
        }

        this.tokenValid = true;
        this.email = (response.data as any).email;

        this.cityService.getAll().subscribe({
          next: (cityResponse: HttpResponse) => {
            this.cities = cityResponse.data.values as City[];
          }
        });
      },
      error: () => {
        this.tokenChecked = true;
        this.tokenValid = false;
        this.errorMessage = "This registration link is invalid or has expired.";
      }
    });
  }

  public addPerson() {
    if (!this.newPersonForm.valid) {
      alert("All fields are required!");
      return;
    } else {
      const person = new Person;

      person.jmbg = this.newPersonForm.get('personJmbg')!.value;
      person.name = this.newPersonForm.get('personName')!.value;
      person.surname = this.newPersonForm.get('personSurname')!.value;
      person.phone_number = this.newPersonForm.get('personPhone')!.value;
      person.year_of_birth = this.newPersonForm.get('personYear')!.value;
      person.password = this.newPersonForm.get('personPassword')!.value;
      // username is derived from the verified email on the backend

      var city!: City;

      this.cities.forEach(element => {
        if (element.id == this.newPersonForm.get('personCity')!.value) {
          city = element;
        }
      });
      person.city = city;

      this.registrationService.completeRegistration(this.token, person).subscribe({
        next: (res) => {
          alert("You successfully created an account!");
          this.router.navigate(['/login_guest']);
        },
        error: () => {
          alert("Something went wrong while creating your account. Please try again.");
        }
      });
    }
  }
}
