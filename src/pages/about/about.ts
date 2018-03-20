import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { DetalhePage } from '../detalhe/detalhe';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [
    MovieProvider
  ]
})
export class AboutPage {

  items: any;
  public lista_filmes = new Array<any>();
  public page = 1;


  public loader;
  public refresher;
  public isRefresing: boolean = false;
  public infiniteScroll;






  constructor(
    public navCtrl: NavController,
    private movieProvider: MovieProvider,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) { }
  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Filmes..."

    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefresing = true;

    this.loadMovies();



  }


  ionViewDidEnter() {
    this.loadMovies();

  }


  abrirDetalhes(filme){
    console.log(filme)
    this.navCtrl.push(DetalhePage, { id: filme.id });
  }


  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.loadMovies(true);



  }









  private loadMovies( newpage : boolean = false ) {
    this.showLoading();
    


    this.movieProvider.getPopularMovies(this.page).subscribe(
     data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
   
      if (newpage){
        this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
        this.newMethod();

      }else {
         this.lista_filmes = objeto_retorno.results;
      }



      this.hideLoading();
      if (this.isRefresing) {
        this.refresher.complete();
        this.isRefresing = false;
      }
    }, error => {
      this.hideLoading();
      if (this.isRefresing) {
        this.refresher.complete();
        this.isRefresing = false;
      }
    });
  }

  private newMethod() {
    this.infiniteScroll.complete();
    console.log(this.page);
    console.log(this.lista_filmes);
  }
}





