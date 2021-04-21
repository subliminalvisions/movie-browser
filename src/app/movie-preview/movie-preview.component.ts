import { Component, Input, OnInit, 
  OnChanges, AfterViewInit,
  EventEmitter, Output
 } from '@angular/core';
import { MovieModel } from '../movie.model';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.less']
})
export class MoviePreviewComponent implements OnInit, OnChanges, AfterViewInit{

  @Input() movie: MovieModel;
  @Input() currentSlide: number;
  @Output() highlighted: number;
  active: boolean;
  position: number;
  placement: number;

  constructor() { }

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
  makeActive() {
    this.active = true;

  }

}
