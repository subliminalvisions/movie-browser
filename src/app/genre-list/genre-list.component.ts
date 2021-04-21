import { Component, OnInit, OnChanges} from '@angular/core';
import { ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { ChangeDetectorRef, AfterContentInit, AfterViewChecked } from '@angular/core';
import { DataService } from '../data.service';
import { MovieModel } from '../movie.model';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.less']
})
export class GenreListComponent implements OnInit, OnChanges, 
AfterContentInit, AfterViewChecked {

  // try focus view btn on load
  @ViewChild("focusEl", { static: true }) viewAllBtn: ElementRef;
  // @ViewChild("movieContainer") movieContainer: ElementRef;
  @ViewChild('movieWrap', { static: true }) myWrappr: ElementRef;

  crrSlide: number = 1;
  totalItems: number;
  movies: MovieModel[];
  isMoving: boolean;
  currentSlide: number = 1;
  wrapperWidth: number;
  itemWidth: number;
  listWrap: boolean = false;

  constructor(movieData: DataService,
    private changeDetect: ChangeDetectorRef) { 
    this.movies = movieData.movieList;
  }

  ngOnInit(): void {
    // console.log('init', this.crrSlide);
    this.totalItems = (this.movies.length);
    console.log('tot', this.totalItems);
  }
  ngOnChanges(): void {
    // console.log('chngd', this.crrSlide);
  }
  // AfterViewInit,
  ngAfterContentInit(): void {
    this.getWidth();
  }
  ngAfterViewChecked(): void {
    // console.log('chngd', this.crrSlide);
  }
  getWidth() {
    // let el = this.myWrappr;
    this.changeDetect.detectChanges();
    let wrapperWidth = this.myWrappr.nativeElement.offsetWidth*2;
    this.itemWidth = this.myWrappr.nativeElement.offsetWidth/2;
    console.log('el, ',  this.itemWidth);
    // let width = this.movWrap.nativeElement.offsetWidth;
    // console.log('w',  width) ;
    // let height = this.movWrap.nativeElement.offsetHeight;
  }
  ToggleAll() {
    this.listWrap = !this.listWrap;    
    console.log('wrap', this.listWrap);
    console.log('change Togg');

  }

  moveNext() {
      this.moveCarouselTo(this.crrSlide);
  }

  moveCarouselTo(slide) {
    let itemWidth = this.myWrappr.nativeElement.offsetWidth/2;
          const newPrevious = slide - 1,
          newNext = slide + 1,
          oldPrevious = slide - 2,
          oldNext = slide + 2;
  }


  nextSlide(){
    if (this.crrSlide<4) {
      this.crrSlide++;
      // this.myWrappr.nativeElement.offsetWidth 
      // this.myWrappr.nativeElement.style.marginLeft

      // this.myWrappr.nativeElement.style.marginLeft
      // = this.myWrappr.nativeElement.style.marginLeft - this.itemWidth;
      
      // this.itemWidth 

      // console.log(this.myWrappr);

    }

  }
  prevSlide(){
    if (this.crrSlide>1) {
      this.crrSlide--;
      // this.myWrappr.nativeElement.offsetWidth = this.myWrappr.nativeElement.offsetWidth/2;

    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    const key = event.key;
      switch (key) {
        case "Tab":
          console.log('Tab key pressed');
          break;
        case "Enter":
          console.log('Enter key pressed');
          this.currentSlide = 1;
          break;
        case "ArrowDown":
          break;
        case "ArrowUp":
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
