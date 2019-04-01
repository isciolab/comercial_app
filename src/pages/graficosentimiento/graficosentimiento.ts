import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the GraficosentimientoPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'GraficosentimientoPage',
    segment: 'graficosentimiento'
  }
)
@Component({
  selector: 'page-graficosentimiento',
  templateUrl: 'graficosentimiento.html'
})
export class GraficosentimientoPage {

  llamadasRoot = 'Graphic1Page'
  experienciasRoot = 'Graphic3Page'


  constructor(public navCtrl: NavController) {}

}
