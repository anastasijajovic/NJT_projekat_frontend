import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpResponse} from 'src/app/network/HttpResponse';
import { Adoption } from '../model/Adoption';
import { Person } from '../model/Person';
import { personService } from './personService';

@Injectable({
    providedIn: 'root'
})
export class adoptionService{

    constructor(private http: HttpClient, private personService: personService){}
    
    public getAll(): Observable <HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/adoptions/all")
    }

    public addNewAdoption(adoption: Adoption): Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+ "/adoptions/add", adoption);
    }

    public deleteAdoption(id: Number): Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+"/adoptions/delete", id);
    }

    public getAdoption(id:Number): Observable<HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl+"/adoptions/getAdoption/"+id);
    }

    public updateAdoption(adoption: Adoption):Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+"/adoptions/update", adoption);
    }

    public getPersonsAdoptions(): Observable<HttpResponse>{
        return this.http.post<HttpResponse>(environment.backendServerUrl+"/adoptions/getPersonsAdoptions", this.personService.getSpesificPerson());
    }

    public getAdoptionStatus(status:Number): Observable<HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl+"/adoptions/getAdoptionStatus/"+status);
    }
}