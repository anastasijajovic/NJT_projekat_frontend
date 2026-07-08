import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { cityService } from '../services/cityService';
import { City } from '../model/City';
import { Component, EventEmitter, Input, OnInit} from '@angular/core';
import { Person } from '../model/Person';
import { personService } from '../services/personService';
import { HttpResponse } from '../network/HttpResponse';
import { Router } from '@angular/router';
@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html'
})
export class CompleteRegistrationComponent implements OnInit {
  public registerForm!: FormGroup;
  public cities: City[] = [];
  private token: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: personService,
    private cityService: cityService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // 1. Dobijanje tokena iz URL-a
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    // 2. Učitavanje gradova
    this.cityService.getAll().subscribe((res: any) => {
      this.cities = res.data.values;
    });

    // 3. Kreiranje forme
    this.registerForm = this.fb.group({
      jmbg: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      year_of_birth: ['', Validators.required],
      phone_number: ['', Validators.required],
      city: [null, Validators.required],
      password: ['', Validators.required]
    });
  }

  public completeRegistration() {
    if (this.registerForm.valid) {
      // Pravimo objekat koji backend očekuje
      const fullData = this.registerForm.value;

      // Pozivamo servis sa tokenom kao query parametrom
      this.personService.completeRegistration(fullData, this.token).subscribe({
        next: () => {
          alert("Registracija uspešno završena!");
          this.router.navigate(['/login']);
        },
        error: (err) => alert("Greška: " + err.error)
      });
    }
  }
}
