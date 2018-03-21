import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the DetalheseriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalheseries',
  templateUrl: 'detalheseries.html',
  providers:[MovieProvider],
})
export class DetalheseriesPage {


  public serie;
  public serieid;
  public lista_series = new Array<any>();
  items: any;



  public loader;
  public refresher;






  constructor(
    public navCtrl: NavController,
    private movieProvider: MovieProvider,
  public navParams: NavParams ) {
  }


  ionViewDidEnter() {
    
    this.serieid = this.navParams.get("id");
    this.movieProvider.getSerieDetails(this.serieid).subscribe( data=>{
      let retorno = (data as any )._body;
      const response = (data as any);
      this.serie = JSON.parse(retorno);

  },error=>{
    console.log('erro')
   })
  }

}
