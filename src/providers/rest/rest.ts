import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestOptions} from "@angular/http";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://88.208.3.175:8081/';

  experiences :{};
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  sendExperiences(experiences) {

    console.log(experiences);
    this.experiences = experiences;

    let exp = this.experiences[0];
    console.log(this.experiences);

    let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data;boundary=----');
    let formData = new FormData();

    formData.append('lugar', exp.lugar);
    formData.append('cliente', exp.cliente);
    formData.append('user', "test");
    formData.append('pediste_info', "1");
    return new Promise((resolve, reject) => {

      this.http.post(this.apiUrl + 'experience/register', formData, {
         headers: headers,
        // params: new HttpParams().set('id', '3'),
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });
  }

}
