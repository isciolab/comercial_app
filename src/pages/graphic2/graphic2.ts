import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as HighCharts from 'highcharts';
import {HomePage} from "../home/home";
import {RestProvider} from "../../providers/rest/rest";
/**
 * Generated class for the Graphic1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({

  name: 'Grafico2',
  segment: 'graphic2'

})
@Component({
  selector: 'page-graphic2',
  templateUrl: 'graphic2.html',
})
export class Graphic2Page {
user:any;
  desde:any;
  hasta:any;
  chartOptions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,   public restProvider: RestProvider) {


 

  }
 gotoHome(){
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Graphic1Page');

    this.getDataGraphic();


  }

  getDataGraphic() {

   
      this.restProvider.getCallsPromedio(this.user==undefined?'':this.user, this.desde==undefined?'':this.desde, 
        this.hasta==undefined?'':this.hasta, 'calls/promediocall')
        .then(data => {
        let datas: any = data;
          console.log(datas); 
        this.chartOptions = {
             chart: {
                    type: 'column'
                },
                title: {
                    text: 'Promedio de duración de la llamada'
                },
                subtitle: {
                    text: 'Comparacion por comercial'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Duración (segundos)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Duración promedio: <b>{point.y:.1f} segundos</b>'
                },
                series: [{
                    name: 'Duración promedio',
                    data: datas.calls,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    },
                }]

                }

                 this.generateChart();


         
          //}
        }).catch(e => {
        //this.presentToast("Error obtener la ata");
            console.log('Error al consultar el api');
      });

    
}



  generateChart() {


    var myChart = HighCharts.chart('container', this.chartOptions);
  }
}
