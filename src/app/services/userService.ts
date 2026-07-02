import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpResponse} from 'src/app/network/HttpResponse';

@Injectable({
    providedIn: 'root'
})
export class userService{

    constructor(private http: HttpClient){}
    
    public login(username: String, password:String): Observable <HttpResponse>{
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/users/login/"+username+"/"+password);
    }

    public setSessionData(res:any){
        sessionStorage.setItem('user', String(res.username));
        this.setUserStatus();
    }

    public setUserStatus(){
        sessionStorage.setItem('currentUser', 'worker');
    }

    public getUserStatus(){
        return sessionStorage.getItem('currentUser');
    }

    public logOut(){
        sessionStorage.clear();
      }
}