import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../network/HttpResponse';


@Injectable({
  providedIn: 'root'
})
export class petImageService {


  constructor(private http: HttpClient) { }



  uploadImages(
    petId: number,
    files: File[],
    primary: number
  ): Observable<HttpResponse> {


    const formData = new FormData();


    files.forEach(file => {

      formData.append(
        "files",
        file
      );

    });


    formData.append(
      "primary",
      primary.toString()
    );



    return this.http.post<HttpResponse>(
      environment.backendServerUrl
      + "/pet-images/upload/"
      + petId,
      formData
    );

  }



  getImages(
    petId: Number
  ): Observable<HttpResponse> {


    return this.http.get<HttpResponse>(
      environment.backendServerUrl
      + "/pet-images/"
      + petId
    );

  }
  setPrimaryImage(
    imageId: number
  ): Observable<HttpResponse> {

    return this.http.put<HttpResponse>(
      environment.backendServerUrl
      + "/pet-images/set-primary/"
      + imageId,
      {}
    );

  }

}
