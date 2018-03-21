import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the DetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html',
  providers:[MovieProvider],
  
})
export class DetalhePage {

  public filme;
  public filmeid;
  public serie;
  public serieid;
  items: any;
  public lista_filmes = new Array<any>();

  


  constructor(
    public navCtrl: NavController,
    private movieProvider: MovieProvider,

     public navParams: NavParams) {
  }

  ionViewDidEnter() {

    this.newMethod(); 
    this.filmeid = this.navParams.get("id");
    this.movieProvider.getMovieDetails(this.filmeid).subscribe( data=>{
      let retorno = (data as any )._body;
      this.filme = JSON.parse(retorno);

  },error=>{
    console.log('erro')
   })
  }

  abrirDetalhes(filme){
 
    console.log(filme)
    this.navCtrl.push(DetalhePage, { id: filme.id });
  }




  private newMethod() {
    this.filmesSimilares();
  }

  private filmesSimilares() {
    this.filmeid = this.navParams.get("id");
    this.movieProvider.getSimilarMovies(this.filmeid).subscribe(data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      this.lista_filmes = this.lista_filmes;
      console.log(objeto_retorno);
      this.lista_filmes = objeto_retorno.results;
    }, error => {
      console.log(error);
    });
  }

  
}
