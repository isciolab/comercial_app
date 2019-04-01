import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as HighCharts from 'highcharts';
import * as firebase from "firebase";
import {HomePage} from "../home/home";
import {RestProvider} from "../../providers/rest/rest";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@IonicPage({

  name: 'Grafico1',
  segment: 'graphic1'

})
@Component({
  selector: 'page-graphic1',
  templateUrl: 'graphic1.html',
})
export class Graphic1Page {

myDate: String = new Date().toISOString();
  chartOptions: any;
  private userProfiles :any;

  user:any;
  desde:any;
  hasta:any;
  users:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase,
  	public restProvider: RestProvider) {


  }

  getUsersData() {
  	
       this.userProfiles=this.afDB.list('userProfiles');
       console.log(this.userProfiles);
       
     this.users = this.userProfiles.snapshotChanges().pipe(
      map(changesb => {

        let changes: any = changesb;
        return changes.map(a => {

        	const $key = a.key;
        	console.log(a.payload.val().email);

			 const data = { $key, $value: a.payload.val() };

        	console.log(data);
         // const data = a.payload.doc.data() as Idata;
          //data.id = a.payload.doc.id;
          return data;
        })
      }));

     console.log(this.users);
	}
 
 gotoHome(){
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Graphic1Page');

  	this.getUsersData();
  	this.getDataGraphic();
  	console.log(this.users);
  

  }

  getDataGraphic() {
      console.log(this.desde);
      this.restProvider.getCallsFills(this.user==undefined?'':this.user, this.desde==undefined?'':this.desde, 
        this.hasta==undefined?'':this.hasta, 'calls/getAllSentim')
        .then(data => {
          
            let datas: any = data;
			    this.chartOptions = {
				   	chart: {
				        type: 'line'
				    },
				    title: {
				        text: 'Evolucion en el tiempo del sentimiento'
				    },
				    subtitle: {
				        text: 'Source: Llamadas'
				    },
				    xAxis: {
				        categories: datas.fechas
				    },
				    yAxis: {
				        title: {
				            text: 'Evolucion del sentimiento'
				        }
				    },
				    plotOptions: {
				        line: {
				            dataLabels: {
				                enabled: true
				            },
				            enableMouseTracking: false
				        }
				    },
				    series: datas.calls

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
