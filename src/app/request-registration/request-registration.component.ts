import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { registrationService } from '../services/registrationService';
import { HttpResponse } from '../network/HttpResponse';

@Component({
  selector: 'app-request-registration',
  templateUrl: './request-registration.component.html',
  styleUrls: ['./request-registration.component.css']
})
export class RequestRegistrationComponent {
  public emailForm!: FormGroup;
  public submitted = false;
  public infoMessage = '';

  constructor(private registrationService: registrationService, private formBuilder: FormBuilder) {
    this.emailForm = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public submitEmail() {
    if (!this.emailForm.valid) {
      alert("Please enter a valid email address!");
      return;
    }

    const email = this.emailForm.get('email')!.value;

    this.registrationService.requestRegistration(email).subscribe({
      next: (response: HttpResponse) => {
        this.infoMessage = response.message;
        this.submitted = true;
      },
      error: () => {
        alert("Something went wrong while sending the email. Please try again.");
      }
    });
  }
}
