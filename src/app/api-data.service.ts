import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
//
import { httpOptions } from './http-options';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {

    this.handleError = httpErrorHandler.createHandleError('MovieService');
  }



  getMovieList() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authentication', `${student.token}`);
    
    let options = new RequestOptions({ headers: headers });
    // return this.http
    //     .put(url, JSON.stringify(student), options);

    let url = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=' + this.apiKeyV3;

    return this.http.get(url)
      .pipe(
          catchError(this.handleError('GetGenres', []))
      );
  }
}
