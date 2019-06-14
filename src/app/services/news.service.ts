import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  result;
  getNews(){
    return this.http.get(this.apiUrl).toPromise().then(data => {
      this.result =  data;
    });
  }
  // business | entertainment | health | science |  sports | technology
  getNewsByCategory(category : string){
    let response;
    this.http.get(this.apiUrl + '&category={category}').subscribe(res => {
      response = res;
    });
    return response;
  }
}
