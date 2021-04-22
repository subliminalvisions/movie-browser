import { Component, OnInit, OnChanges} from '@angular/core';
import { ViewChild, ElementRef, HostListener } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { MovieModel } from '../movie.model';
import { CurrentSlideService } from '../current-slide.service';
import {Observable} from "rxjs";// First you need to import Observable

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.less']
})
export class GenreListComponent implements OnInit, OnChanges {

  // try to focus view btn on load but not finished
  @ViewChild("focusEl", { static: true }) viewAllBtn: ElementRef;
  @ViewChild('movieWrap', { static: true }) myWrappr: ElementRef;

  activSlide: number;
  activMin: number;
  movLength: number;
  movies: MovieModel[];
  slimView: boolean = true;

  constructor(
    public movieData: DataService,
    public slideService: CurrentSlideService,
    private cd: ChangeDetectorRef) { 
    this.movies = movieData.movieList;
  }

  ngOnInit(): void {
    this.movLength = (this.movies.length);
    this.slideService.getActivSlide().subscribe(activNum => {
      this.activSlide  = activNum;
      this.activMin  = activNum-4;
   });
  }
  ngOnChanges(): void {
  }
  ngDoCheck() {
      this.cd.detectChanges();
      this.activSlide = this.slideService.getActivSlideNum();

      if(this.activSlide>4) {
        this.activMin = this.activSlide-3;
      } else { this.activMin=-3 }
  }

  ToggleAll() {
    this.slimView = !this.slimView;    
  }

  nextSlide(){
    let maxnum = this.movies.length;
    if (this.activSlide<maxnum) {
      this.activSlide++;
      this.slideService.updateSlideNum(this.activSlide);
    }
  }

  prevSlide(){
    if (this.activSlide>1) {
      this.activSlide--;
      this.slideService.updateSlideNum(this.activSlide);
    }
  }

  upSlide(){
    if ((this.activSlide>4) && (this.slimView==false)) {
      this.activSlide= +this.activSlide+-4;
      this.slideService.updateSlideNum(this.activSlide);
    }
  }
  downSlide(){
    if ((this.activSlide<(this.movLength -3) && this.slimView==false)) {
      this.activSlide= +this.activSlide+4;
      this.slideService.updateSlideNum(this.activSlide);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    const key = event.key;
      switch (key) {
        case "ArrowDown":
          this.downSlide();
          break;
        case "ArrowUp":
          this.upSlide();
          break;
        case "ArrowLeft":
            this.prevSlide();
          break;
        case "ArrowRight":
          this.nextSlide();
          break;
      }
  }

}
