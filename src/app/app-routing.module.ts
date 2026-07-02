import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPetsComponent } from './all-pets/all-pets.component';
import { AllPeopleComponent } from './all-people/all-people.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { UpdatePetComponent } from './update-pet/update-pet.component';
import { AllAdoptionsComponent } from './all-adoptions/all-adoptions.component';
import { AddAdoptionComponent } from './add-adoption/add-adoption.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageGuestComponent } from './login-page-guest/login-page-guest.component';
import { RequestsComponent } from './requests/requests.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', component: LoginPageGuestComponent},
  {path:'login_guest', component: LoginPageGuestComponent},
  {path:'pets', component: AllPetsComponent},
  {path:'people', component: AllPeopleComponent},
  {path:'add_pet', component: AddPetComponent},
  {path:'add_person', component: AddPersonComponent},
  {path:'update_person/:input', component: UpdatePersonComponent},
  {path:'update_pet/:input', component: UpdatePetComponent},
  {path:'adoptions', component: AllAdoptionsComponent},
  {path:'add_adoption', component: AddAdoptionComponent},
  {path:'login', component: LoginPageComponent},
  {path:'requests', component: RequestsComponent},
  {path:'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
