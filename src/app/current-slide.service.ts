import { Injectable, HostListener } from '@angular/core';
import { DataService } from './data.service';
import {Observable} from "rxjs";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentSlideService {
  currentSlide: number = 1;

  constructor(public data: DataService) { }

  updateSlideNum(num: number) {
    this.currentSlide = num;
  }
  getActivSlide(): Observable<number> {
    return of(this.currentSlide);
  }
  getActivSlideNum(): number {
    return this.currentSlide;
  }

}
