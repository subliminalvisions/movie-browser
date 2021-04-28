import { HttpHeaders, HttpParams } from '@angular/common/http';
// get hidden api keys 
import { APIconfig } from './api-keys';

export interface IRequestOptions {
  body?: any;
  headers?: HttpHeaders | { [header: string]: string | Array<string> };
  observe?: any;
  params?: HttpParams | { [param: string]: string | Array<string> };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
export const httpOptions: IRequestOptions = {
    // xhr.setRequestHeader(
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // get your own keys here https://docs.rapidapi.com/docs/keys
    // 'x-rapidapi-key': APIconfig.db23Key,
    // 'x-rapidapi-host': 'imdb23.p.rapidapi.com'
    // 'Authorization': 'my-auth-token'
  }),
  params: null,
  observe: 'response'
};
// let headers = new Headers();
// headers.append('authentication', `${student.token}`);
// let options = new RequestOptions({ headers: headers });
