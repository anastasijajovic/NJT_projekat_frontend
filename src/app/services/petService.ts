import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpResponse} from 'src/app/network/HttpResponse';
import { Pet } from '../model/Pet';

@Injectable({
    providedIn: 'root'
})
export class petService{

    constructor(private http: HttpClient){}

    public addNew(pet: Pet): Observable<HttpResponse>{
        console.log(pet.name);
        console.log(pet.id);
        return this.http.post<HttpResponse>(environment.backendServerUrl + "/pets/add", pet);
    }
    
    public getAll(): Observable <HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/pets/all")
    }

    public getWithStatus(status: Number):Observable<HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl+"/pets/withStatus/"+status);
    }

    public delete(petId: Number): Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl + "/pets/delete",petId);
    }

    public searchPets(search: String): Observable<HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl+'/pets/search/'+ search);
    }

    public getPet(id: Number): Observable<HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl+"/pets/getPet/"+id);
    }

    public updatePet(pet:Pet):Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+"/pets/update", pet);
    }
   
}