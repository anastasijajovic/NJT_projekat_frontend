import { Component } from '@angular/core';
import { userService } from './services/userService';
import { personService } from './services/personService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-Projekat-Front';

  constructor(public userService: userService, public personService: personService){}

  logout(){
    this.personService.logOut();
    this.userService.logOut();
  }
}
