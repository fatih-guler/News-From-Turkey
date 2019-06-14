import { Component, OnInit } from '@angular/core';
import { NewsService } from './services/news.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Türkiye'den Haberler";
  apiUrl = environment.apiUrl;
  data: News[] = [  ];
  constructor(private http: HttpClient,
              private _sanitizer: DomSanitizer) {

  }
// tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(){
    this.getNews();
  }

  getNews(){
    let _this = this;
    this.data = [];
    const apiData =this.http.get<News[]>(this.apiUrl).pipe(map(res => {
        return res;
    })); 
    apiData.subscribe({
      next(x) {
// tslint:disable-next-line: no-string-literal
        _this.data = x['articles'];  
        _this.data.forEach(element => {
          console.log(element.author)
        }); 
      },
      error(err){
        console.log(err);
      }
    }); 
  }

  getNewsByCategory(category){
    let _this = this;
    this.data = [];
    const apiData =this.http.get<News[]>(this.apiUrl + '&category=' + category).pipe(map(res => {
        return res;
    })); 
    apiData.subscribe({
      next(x) {
// tslint:disable-next-line: no-string-literal
        _this.data = x['articles'];  
        _this.data.forEach(element => {
          console.log(element.author)
        }); 
      },
      error(err){
        console.log(err);
      }
    }); 
  }
  getImage(image){
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }

}
export class News{
  author: string;
  content: string;
  description: string;
  title: string;
  url: string;
  urlToImage: string;
}