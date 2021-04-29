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

  getMovieList() {    
    let urlBase = "https://imdb23.p.rapidapi.comhttps//filmets.info/test";
    const url = urlBase;
    console.log('getMov,url, ', url);
    return this.http.get(url, httpOptions)

  }

}
