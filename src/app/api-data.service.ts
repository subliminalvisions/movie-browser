import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { httpOptions } from './http-options';
// keys were imported into httpOptions above 
import { APIconfig} from './api-keys';
import { HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Response } from '@angular/http';
import { EMPTY, empty, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  public handleError: HandleError;
  data: {};
  endpoint: string;
  apiKeyV3 = APIconfig.tmdbKey;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    // private APIconfig
    ) {
    this.handleError = httpErrorHandler.createHandleError('MovieService');
  }

  getMovies(filters) {
    //var urlPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKeyV3;
    //var urlTopRated= 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + this.apiKeyV3;
    //var urlNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + this.apiKeyV3;
    let filter = '&language=en-US&include_adult=false&media_type=movie&include_video=false&vote_count.gte=0&list_style=1';
    // Are we Search or Discover?
    let urlType= 'discover';
    if (filters.search !== undefined && filters.search !== null) {
      urlType = 'search';
      filter += `&query=${filters.search}`;
    }
    const urlBase =  `https://api.themoviedb.org/3/${urlType}/movie?api_key=${this.apiKeyV3}`;

    // filter by year
    // console.log('filters', filters);
    if (filters !== undefined) {
       filter += `&primary_release_year=${filters.year}`;
    }

    // filter by genre
    // if(this.genre_id != "null") {
    //     this.filterByGenres = '&with_genres=' + this.genre_id;
    // }
    // else {
    //     this.filterByGenres = '';
    // }


    // filter by keyword
    // A comma separated list of keyword ID's. Only include movies that have one of the ID's added as a keyword.
    /*
    var keywordIds = this.keywordsArray.map(a => a.id);
    var strArrayKeywords = keywordIds.join(", ");
    this.filterByKeywords = '&with_keywords=' + encodeURIComponent(strArrayKeywords);
    */


    // page
    const page = '&page=' + filters.page;
    const url = urlBase + filter + page;

    return this.http.get(url)
      .pipe(
          catchError(this.handleError('GetMovies', []))
      );

  }

  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  getProducts(): Observable<any> {
    let endpoint = "https://imdb23.p.rapidapi.comhttps//filmets.info/test";
    console.log('ep, ', endpoint);

    return this.http.get(endpoint).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }  
  getData() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("GET", "https://imdb-api1.p.rapidapi.com/Title/k_12345678/tt1375666");
    xhr.setRequestHeader("x-rapidapi-key", "9a015dfb5emsh5082da6b6cc6fdep12176cjsn13c9caf66159");
    xhr.setRequestHeader("x-rapidapi-host", "imdb-api1.p.rapidapi.com");
    
    xhr.send(data);
    
  }
  // getMovies() : Observable<any>{
  //   let urlBase = "https://imdb23.p.rapidapi.comhttps//filmets.info/test";
  //   return this.http.get(urlBase)
  //       .map((response: Response) => response.json())
  //       .catch(this.handleError);
  // }

  getMovieList() {    
    // return this.http
    //     .put(url, JSON.stringify(student), options);
    let urlBase = "https://imdb23.p.rapidapi.comhttps//filmets.info/test";
    // const url = urlBase + filter + page;
    const url = urlBase;

    // console.log('getMov,key, ', this.APIconfig);
    console.log('getMov,url, ', url);
    // console.log('getMov,url, ', httpOptions);
    // 'https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=' 
    // + this.apiKeyV3;
    return this.http.get(url, httpOptions)
      // .pipe(
      //     catchError(this.handleError('GetMovieList', []))
      // );
  }
  // private handleError(error: HttpErrorResponse): any {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }

}
