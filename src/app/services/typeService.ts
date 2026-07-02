import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpResponse} from 'src/app/network/HttpResponse';

@Injectable({
    providedIn: 'root'
})
export class typeService{

    constructor(private http: HttpClient){}
    
    public getAll(): Observable <HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/types/all")
    }
}