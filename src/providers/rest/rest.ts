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

  sendExperiences(exp) {

    console.log(exp);


    let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data;boundary=----');
    let formData = new FormData();

    formData.append('lugar', exp.lugar);
    formData.append('cliente', exp.cliente);
    formData.append('user', exp.user);
    formData.append('pediste_info', exp.pediste_datos?'1':'0');
    if(exp.audio1!=undefined) {
      try {
        console.log(exp.audio1);
        formData.append('audio1', exp.audio1.filename);
        formData.append('uploaded_file', new Blob(exp.audio1.file), exp.audio1.filename);
      }catch {
        console.log('no se paso el audio');
      }
    }
    if(exp.audio2!=undefined) {
      try {
      console.log(exp.audio1);
      formData.append('audio2', exp.audio2.filename);
      formData.append('uploaded_file2', new Blob(exp.audio2.file), exp.audio2.filename);
      }catch {
        console.log('no se paso el audio');
      }
    }
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
