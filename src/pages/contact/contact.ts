import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    private movieProvider : MovieProvider,
    public navParams : NavParams 
   ){}

   ionViewDidLoad() {
    
    this.movieProvider.getLatestMovies().subscribe(
         data => {
           const response = (data as any);
           const objeto_retorno = JSON.parse(response._body);
          console.log(objeto_retorno);

         }, error =>{
          console.log(error);
         })

  }

  }

