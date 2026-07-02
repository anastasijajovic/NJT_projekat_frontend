import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
//import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllPetsComponent } from './all-pets/all-pets.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { petService } from './services/petService';
import { AllPeopleComponent } from './all-people/all-people.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPersonComponent } from './add-person/add-person.component';
import { personService } from './services/personService';
import { cityService } from './services/cityService';
import { typeService } from './services/typeService';
import { CommonModule } from '@angular/common';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { UpdatePetComponent } from './update-pet/update-pet.component';
import { AllAdoptionsComponent } from './all-adoptions/all-adoptions.component';
import { AddAdoptionComponent } from './add-adoption/add-adoption.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PersonCardComponent } from './person-card/person-card.component';
import { PetCardComponent } from './pet-card/pet-card.component';
import { AdoptionCardComponent } from './adoption-card/adoption-card.component';
import { LoginPageGuestComponent } from './login-page-guest/login-page-guest.component';
import { RequestsComponent } from './requests/requests.component';
import { RegisterComponent } from './register/register.component'

@NgModule({
  declarations: [
    AppComponent,
    AllPetsComponent,
    ToolbarComponent,
    AllPeopleComponent,
    AddPetComponent,
    AddPersonComponent,
    UpdatePersonComponent,
    UpdatePetComponent,
    AllAdoptionsComponent,
    AddAdoptionComponent,
    LoginPageComponent,
    PersonCardComponent,
    PetCardComponent,
    AdoptionCardComponent,
    LoginPageGuestComponent,
    RequestsComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
    //MatIconModule,
  ],
  providers: [petService, personService, cityService, typeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
