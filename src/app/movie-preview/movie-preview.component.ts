import { Component, Input, OnInit, 
  OnChanges, AfterViewInit,
  EventEmitter, Output
 } from '@angular/core';
import { MovieModel } from '../movie.model';
import { CurrentSlideService } from '../current-slide.service';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.less']
})
export class MoviePreviewComponent implements OnInit, OnChanges, AfterViewInit{

  @Input() movie: MovieModel;

  // move to service?
  @Input() currentSlide: number;

  // @Output() highlighted: number;
  // move to service?
  @Output() highlightedNum = new EventEmitter<number>();

  active: boolean;
  position: number;
  placement: number;

  constructor(public slideService: CurrentSlideService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.active = (this.currentSlide===this.movie.id);
    this.placement = this.movie.id;
    this.position = (this.movie.id -1)*25;
    console.log(this.position);
  }

  ngOnChanges(): void {
    this.active = (this.currentSlide===this.movie.id);
    // this.placement = this.movie.id;
    this.position = (this.placement -1)*25;
  }
  makeActive(num) {
    const seletedNum = num;
    console.log('num',num);
    this.slideService.updateSlideNum(num);
    this.active = !this.active;
    this.highlightedNum.emit(seletedNum); 
  }

}
