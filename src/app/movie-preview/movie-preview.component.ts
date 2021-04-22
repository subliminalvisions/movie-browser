import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieModel } from '../movie.model';
import { CurrentSlideService } from '../current-slide.service';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.less']
})
export class MoviePreviewComponent implements OnInit {

  @Input() movie: MovieModel;
  active: boolean;
  activSlide: number;

  constructor(
    public slideService: CurrentSlideService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    // get active Slide 
    this.slideService.getActivSlide().subscribe(activNum => {
      // set this instance to active if match
      this.active = (activNum===this.movie.id);
    });
  }

  ngDoCheck() {
    this.cd.detectChanges();
    this.activSlide = this.slideService.getActivSlideNum();
    // update active state if match in Service variable
    this.active = (this.activSlide===this.movie.id);
  }

  makeActive(num: number) {
    this.slideService.updateSlideNum(num);
    // set this instance to active if match in Service variable
    this.active = (this.slideService.currentSlide===this.movie.id);
  }

}
