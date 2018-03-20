
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseApiPath  = this.api();
  private apiKey = this.keyApi()


  constructor(public http: Http) {
   // console.log('Hello MovieProvider Provider');
  }

  private keyApi() {
    return "api_key=048c4a9479d848fd422fc753cb680145";
  }

  private api() {
    return "https://api.themoviedb.org/3/";
  }

  getLatestMovies(){
    return this.http.get(this.baseApiPath + "movie/latest?" + this.apiKey)
  }

  getPopularMovies(page = 1){
    return this.http.get(this.baseApiPath + "movie/popular?" + this.apiKey + `&language=pt-BR&page=${page}`)
  }


  getMovieDetails(filmeid){
    return this.http.get(this.baseApiPath + `movie/${filmeid}?` + this.apiKey)
  }

}
