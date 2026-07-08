import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { Person } from '../model/Person';

@Injectable({
    providedIn: 'root'
})
export class registrationService {

    constructor(private http: HttpClient) { }

    // Step 1: submit only the email address
    public requestRegistration(email: string): Observable<HttpResponse> {
        return this.http.post<HttpResponse>(environment.backendServerUrl + "/registration/request", { email });
    }

    // Step 2a: check the token from the emailed link is still valid
    public validateToken(token: string): Observable<HttpResponse> {
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/registration/validate/" + token);
    }

    // Step 2b: submit the rest of the personal info to finish the account
    public completeRegistration(token: string, person: Person): Observable<HttpResponse> {
        return this.http.post<HttpResponse>(environment.backendServerUrl + "/registration/complete/" + token, person);
    }
}
