import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpResponse} from 'src/app/network/HttpResponse';
import { Person } from '../model/Person';

@Injectable({
    providedIn: 'root'
})
export class personService{

    private personthis!: Person;

    constructor(private http: HttpClient){}
    
    public getAll(): Observable <HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/people/all")
    }

    public addNewPerson(person: Person): Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+ "/people/add", person);
    }

    public searchPeople(search: String): Observable<HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl+'/people/search/'+ search);
    }

    public deletePerson(jmbg: String): Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+"/people/delete", jmbg);
    }

    public getPerson(jmbg: String): Observable<HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl+"/people/getPerson/"+jmbg);
    }

    public updatePerson(person: Person):Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+"/people/update", person);
    }

    public login(username: String, password:String): Observable <HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/people/login/"+username+"/"+password);
    }

    public setSessionData(res:any, person: Person){
        sessionStorage.setItem('user', String(res.username));
        // sessionStorage.setItem('jmbg', String(person.jmbg));
        this.setUserStatus();
        this.setPerson(person);
    }

    // public getUserJmbg(){
    //     return sessionStorage.getItem('jmbg');
    // }

    public setUserStatus(){
        sessionStorage.setItem('currentUser', 'guest');
    }

    public setPerson(person: Person){
        console.log("U servisu dodeljuje osobu:");
        console.log(person);
        this.personthis = person;
    }

    public getSpesificPerson(){
        return this.personthis;
    }

    public getUserStatus(){
        return sessionStorage.getItem('currentUser');
    }

    public logOut(){
        sessionStorage.clear();
        this.personthis = new Person();
      }
}