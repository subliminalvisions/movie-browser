import { Component, OnInit, OnChanges} from '@angular/core';
import { ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { ChangeDetectorRef, AfterContentInit, AfterViewChecked } from '@angular/core';
import { DataService } from '../data.service';
import { MovieModel } from '../movie.model';
import { CurrentSlideService } from '../current-slide.service';
import {Observable} from "rxjs";// First you need to import Observable

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

  activSlide: number;
  activMin: number;
  movLength: number;
  movies: MovieModel[];
  isMoving: boolean;
  // currentSlide: number = 1;
  wrapperWidth: number;
  // itemWidth: number;
  // listWrap: boolean = false;
  slimView: boolean = true;

  constructor(
    public movieData: DataService,
    public slideService: CurrentSlideService,
    private cd: ChangeDetectorRef) { 
    this.movies = movieData.movieList;
  }

  ngOnInit(): void {
    // console.log('init', this.crrSlide);

    // this.activSlide = this.slideService.currentSlide;
    // if(!this.activSlide) {this.activSlide = 1;}
    // this.setSlideifEmpty();
    // this.movLength = (this.movies.length);
    this.movLength = (this.movies.length);
    this.activMin  = 1;

    // console.log('tot', this.movLength);

    // this.activSlide = this.slideService.getActivSlide();

    this.slideService.getActivSlide().subscribe(activNum => {
      // console.log(len) // your new cart length here
      this.activSlide  = activNum;
      this.activMin  = activNum-4;
   })
 
  }
  // setSlideifEmpty() {
  // }

  ngOnChanges(): void {
    // this.cd.detectChanges();
    // this.activSlide = this.slideService.currentSlide;

    // console.log('sldSrv', this.slideService.currentSlide);

    // console.log('chngd', this.crrSlide);
  }
  ngDoCheck() {
        this.cd.detectChanges();
    if(this.activSlide>4) {
      // console.log('tst', ((this.movie.id+4)<(this.activSlide)) );
      // this.isHidden = ((this.movie.id+4)<(this.activSlide));
      this.activMin = this.activSlide-3;
    } else {this.activMin=-3}


    console.log(this.activMin);

    // this.activSlide = (this.slideService.getActivSlide());
    // console.log('actv', this.activSlide);
  }
  // AfterViewInit,
  ngAfterContentInit(): void {
    // this.activSlide = this.slideService.currentSlide;

  }
  ngAfterViewChecked(): void {
    // console.log('chngd', this.crrSlide);
  }
  // getWidth() {
  //   // let el = this.myWrappr;
  //   this.cd.detectChanges();
  //   // let wrapperWidth = this.myWrappr.nativeElement.offsetWidth*2;
  //   // this.itemWidth = this.myWrappr.nativeElement.offsetWidth/2;
  //   // console.log('el, ',  this.itemWidth);
  //   // let width = this.movWrap.nativeElement.offsetWidth;
  //   // console.log('w',  width) ;
  //   // let height = this.movWrap.nativeElement.offsetHeight;
  // }
  ToggleAll() {
    // this.listWrap = !this.listWrap;    
    this.slimView = !this.slimView;    
    console.log('slim', this.slimView);
    // console.log('change Togg');
  }

  // moveNext() {
  //     this.moveCarouselTo(this.crrSlide);
  // }

  // moveCarouselTo(slide) {
  //   let itemWidth = this.myWrappr.nativeElement.offsetWidth/2;
  //         const newPrevious = slide - 1,
  //         newNext = slide + 1,
  //         oldPrevious = slide - 2,
  //         oldNext = slide + 2;
  // }


  onClickBeyondWidth() {
    // animate - shift each el left or Right 
    // use css transition 
    // after animation 0.5s set position or visibility 
    // then hide those outside current limit 
  }
  // onPushIngred(data: Ingredient){
  //   this.ingredients.push(data);
  //   console.log(data);
  // }
  onPushNewNum(data: Event) {
    // this.crrSlide = data;
    // this.crrSlide = data;
    //   console.log(data);
      console.log('pshNew', data);
  }
  nextSlide(){
    let maxnum = this.movies.length;

    if (this.activSlide<maxnum) {
      this.activSlide++;
      this.slideService.updateSlideNum(this.activSlide);
      // this.myWrappr.nativeElement.offsetWidth 
      // this.myWrappr.nativeElement.style.marginLeft
      // this.myWrappr.nativeElement.style.marginLeft
      // = this.myWrappr.nativeElement.style.marginLeft - this.itemWidth;
      // this.itemWidth 
      // console.log(this.myWrappr);
    }
  }
  prevSlide(){
    // this.activSlide = this.slideService.getActivSlide();

    if (this.activSlide>1) {
      this.activSlide--;
      this.slideService.updateSlideNum(this.activSlide);
      // this.myWrappr.nativeElement.offsetWidth = this.myWrappr.nativeElement.offsetWidth/2;
    }
  }

  upSlide(){
    
    if (this.activSlide>(this.movLength -4) && this.slimView==false) {
      // this.activSlide+-4;
      this.activSlide= +this.activSlide+-4;

      this.slideService.updateSlideNum(this.activSlide);
    }
  }
  downSlide(){
    console.log(this.slimView);
    if (this.activSlide<(this.movLength -3) && this.slimView==false) {
      console.log(+this.activSlide+4);

      this.activSlide= +this.activSlide+4;
      this.slideService.updateSlideNum(this.activSlide);
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
          this.activSlide = 1;
          break;
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
