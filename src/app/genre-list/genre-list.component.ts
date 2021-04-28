import { Component, OnInit, OnChanges} from '@angular/core';
import { ViewChild, ElementRef, HostListener } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
// import { DataService } from '../data.service';
import { MovieModel } from '../movie.model';
import { CurrentSlideService } from '../current-slide.service';
import {Observable} from "rxjs";// First you need to import Observable
// import { MoviesService } from './movies.service';
import { ApiDataService } from '../api-data.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.less']
})
export class GenreListComponent implements OnInit, OnChanges {

  // try to Focus view btn on load // for Arrow Nav / will reVisit later
  // @ViewChild("focusEl", { static: true }) viewAllBtn: ElementRef;
  @ViewChild('movieWrap', { static: true }) myWrappr: ElementRef;

  activSlide: number;
  activMin: number;
  movLength: number;
  // movies: MovieModel[];
  slimView: boolean = true;
  movieList: any;

  selectedItem: any;
  // Movies
  movies: any;
  sortField = 'name';
  sortOrder = 'asc';
  pageNumber = 1; // movies API starts at 1
  pageSize = 25;
  totalRows = 0;
  bulkCheckbox = false;
  search: any;
  searchStatus = false;

  // Return today's date and time
  currentTime = new Date();
  // returns the year (four digits)
  filterableYears: any[] = [];
  primary_release_year: number = this.currentTime.getFullYear();
  selectedYear: number =  this.primary_release_year;

  moviesRetrieved: number = 0;
  moviesTotal: number = 0;

  constructor(
    // public movieData: DataService,
    public slideService: CurrentSlideService,
    public apiData: ApiDataService,
    private cd: ChangeDetectorRef) { 
    // this.movies = movieData.movieList;
  }

  ngOnInit(): void {
    // this.movieList = this.apiData.getMovieList();
    // this.movieList = this.apiData.getProducts();
    this.getYears();

    // this.movieList = this.getMovies();
    this.getMovies();
    
    // this.movLength = this.movies.length; // undefined

    console.log('mRetrieved, ', this.moviesRetrieved);
    console.log('movies, ', this.movies);
    this.slideService.getActivSlide().subscribe(activNum => {
      this.activSlide  = activNum;
      this.activMin  = activNum-4;
   });
  }
  getYears() {
    var years = [];
    for(var i = this.primary_release_year; years.length <= 100; i--) {
        years.push(i);
    }
    this.filterableYears = years;
    // console.log('GetYears', this.filterableYears);
  }
  getMovies() {

    const filters = {
      year: this.selectedYear,
      page: this.pageNumber,
    }

    // check search


    if (this.search !== undefined && this.search.textSearch !== undefined && this.search.textSearch !== "") {
      filters['search'] = this.search.textSearch;
    }
    console.log('yr', this.primary_release_year);
    console.log('filters', filters);
    //
    this.searchStatus = true;
    this.apiData.getMovies(filters)
      .pipe(
        debounceTime(500),     // wait N ms after each keystroke before considering the term
        distinctUntilChanged() // ignore if next search term is same as previous
      )
      .subscribe(
        data => {
          console.log('GetMovs_data', data);
          if (this.pageNumber === 1) {
            this.movies = data['results'];

          } else {
            // this.movies = this.movies.concat(data['results']);
            // concatenate arrays
            this.movies = [...this.movies, ...data['results']];
          }

          this.moviesRetrieved = this.movies.length;
          this.moviesTotal = data['total_results'];
          this.searchStatus = false;
        }
      );

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
