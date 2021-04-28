export class MovieModel {
    public id: number = undefined;
    public original_title: string = undefined;
    // public title: string = undefined;
    // public description: string = undefined;
    public overview: string = undefined;
    // <h3 class="title">{{ movie.original_title}} </h3>
    // <p class="description">{{ movie.overview }}</p>
    public image: string = undefined;
    public isActive?: boolean = false;  
}

