import { Component, Input, OnInit, 
  EventEmitter, Output, ChangeDetectorRef
 } from '@angular/core';
import { MovieModel } from '../movie.model';
import { CurrentSlideService } from '../current-slide.service';
// import {Observable} from "rxjs";// First you need to import Observable
// import {of} from "rxjs";// First you need to import Observable

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.less']
})
export class MoviePreviewComponent implements OnInit {

  @Input() movie: MovieModel;

  // move to service?
  // @Input() currentSlide: number;

  // @Output() highlighted: number;
  // move to service?
  @Output() highlightedNum = new EventEmitter<number>();

  active: boolean;
  position: number;
  activSlide: number;
  placement: number;
  isVisible: boolean;
  isHidden: boolean;

  constructor(
    public slideService: CurrentSlideService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.slideService.getActivSlide().subscribe(activNum => {
      this.activSlide  = activNum;
      
      this.active = (activNum===this.movie.id);
      // console.log(this.activSlide-this.movie.id);
      // this.isVisible = ((activNum+4)<this.movie.id);

      // this.isVisible = ((this.activSlide  - this.movie.id)<1);
      // console.log(this.isVisible);
      // console.log(this.movie.id<(activNum-4));
    });
  }

  ngDoCheck() {
    this.activSlide = this.slideService.getActivSlideNum();
    this.active = (this.activSlide===this.movie.id);

    // if(this.activSlide>4) {
    //   console.log('tst', ((this.movie.id+4)<(this.activSlide)) );
    //   this.isHidden = ((this.movie.id+4)<(this.activSlide));
    // }
    // isVisible
    // this.isVisible = ((this.activSlide-4)>0);
  }
  makeActive(num: number) {
    this.slideService.updateSlideNum(num);
    this.active = (this.slideService.currentSlide===this.movie.id);
  }

}
