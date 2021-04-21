import { Injectable } from '@angular/core';
import { MovieModel } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public movieList: MovieModel[] = [
    {
      id: 1,
      title: 'Dune',
      description: 'Home on le range where le sandworms roam',
      image: 'dune.jpg',
      // isActive: true
    },
    {
      id: 2,
      title: 'Insecure',
      description: 'Lorem adipiscing elit, sed do eiusmod tempor',
      image: 'pacificrim.jpg',
    },
    {
      id: 3,
      title: 'Party Down',
      description: 'Ut enim ad minim veniam, incididunt ut labore',
      image: 'Jupiter-Ascending.jpg',
    },
    {
      id: 4,
      title: 'Jar Jar Jedi',
      description: 'Laboris nisi ut aliquip ex ea commodo consequat',
      image: 'jar-jar-lightsaber.jpg',
    },
    // will add more later 
    // to simulate sliding sections 
    {
      id: 5,
      title: 'Jar Jar Jedi',
      description: 'Laboris nisi ut aliquip ex ea commodo consequat',
      image: 'jar-jar-lightsaber.jpg',
    },
    {
      id: 6,
      title: 'Jar Jar Jedi',
      description: 'Laboris nisi ut aliquip ex ea commodo consequat',
      image: 'jar-jar-lightsaber.jpg',
    },
    {
      id: 7,
      title: 'Jar Jar Jedi',
      description: 'Laboris nisi ut aliquip ex ea commodo consequat',
      image: 'jar-jar-lightsaber.jpg',
    },
  ]

}
