import { Injectable, HostListener } from '@angular/core';
import { DataService } from './data.service';
import { MovieModel } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentSlideService {
  currentSlide: number = 1;

  constructor(public data: DataService) { }

  updateSlideNum(num: number) {
    this.currentSlide = num;
    console.log('crr, ', num);
  }

}
