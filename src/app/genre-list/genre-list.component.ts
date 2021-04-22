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

  // try to Focus view btn on load // for Arrow Nav / will reVisit later
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
    this.movLength = this.movies.length;
    this.slideService.getActivSlide().subscribe(activNum => {
      this.activSlide  = activNum;
      this.activMin  = activNum-4;
   });
  }
  ngOnChanges(): void {}
  ngDoCheck() {

    // update variables when changes happen
    this.cd.detectChanges();
    // Update var FROM Service to verify selected Movie
    this.activSlide = this.slideService.getActivSlideNum();

    // update horizontal 4 column item visibility 
    // for arrow right navigation 
    if(this.activSlide>4) {
      this.activMin = this.activSlide-3;
    } else { this.activMin=-3; }
  }

  ToggleAll() {
    // Toggles slimView class for flex-wrap for Movie Row
    this.slimView = !this.slimView;    
  }

  nextSlide(){
    // Advancing Selected Slide# +1 on Arrow Right
    if (this.activSlide<this.movLength) {
      this.activSlide++;
      // Update var in Service to deActivate previously selected Movie
      this.slideService.updateSlideNum(this.activSlide);
    }
  }

  prevSlide(){
    // Decreasing Selected Slide# -1 on Arrow Left
    if (this.activSlide>1) {
      this.activSlide--;
      // Update var in Service to deActivate previously selected Movie
      this.slideService.updateSlideNum(this.activSlide);
    }
  }

  upSlide(){
    // going Up 1 Row on Arrow Up // only in View All Mode
    if ((this.activSlide>4) && (this.slimView==false)) {
      this.activSlide= +this.activSlide+-4;
      // Update var in Service to deActivate previously selected Movie
      this.slideService.updateSlideNum(this.activSlide);
    }
  }
  downSlide(){
    // going DOWN 1 Row on Arrow DOWN // only in View All Mode
    if ((this.activSlide<(this.movLength -3) && this.slimView==false)) {
      this.activSlide= +this.activSlide+4;
      // Update var in Service to deActivate previously selected Movie
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
