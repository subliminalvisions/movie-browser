import { Injectable, HostListener } from '@angular/core';
import { DataService } from './data.service';
import { MovieModel } from './movie.model';
import {Observable} from "rxjs";// First you need to import Observable
import { of } from 'rxjs';

// getMovies(): Observable<IMovie[]> {

@Injectable({
  providedIn: 'root'
})
export class CurrentSlideService {
  currentSlide: number = 1;

  constructor(public data: DataService) { }

  updateSlideNum(num: number) {
    this.currentSlide = num;
    console.log('crr, ', this.currentSlide);
  }
  getActivSlide(): Observable<number> {
    // return this.currentSlide;
    return of(this.currentSlide);
  }
  getActivSlideNum(): number {
    // return this.currentSlide;
    return this.currentSlide;
  }

}
