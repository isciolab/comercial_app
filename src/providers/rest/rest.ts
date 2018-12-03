import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestOptions} from "@angular/http";
import {File} from '@ionic-native/file';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://88.208.3.175:8081/';

  experiences: {};

  constructor(public http: HttpClient, private file: File) {
    console.log('Hello RestProvider Provider');
  }

  sendExperiences(exp) {

    console.log(exp);


    let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data;boundary=----');
    let formData = new FormData();

    formData.append('lugar', exp.lugar);
    formData.append('cliente', exp.cliente);
    formData.append('user', exp.user);
    formData.append('pediste_info', exp.pediste_datos ? '1' : '0');
    if (exp.audio1 != undefined) {
      try {
        console.log(exp.audio1);
        formData.append('audio1', exp.audio1.filename);
        // var blob = JSON.stringify(exp.audio1.file);
        // var binary = this.file.readAsDataURL(exp.audio1.pathshort, exp.audio1.filename);
        // var binary = this.file.readAsBinaryString(exp.audio1.pathshort, exp.audio1.filename);
        //  console.log(binary);
        // let blob = new Blob([binary], {type: "audio/3gp" });

        //formData.append('uploaded_file', binary);

        // same till reasAsDataUrl
        this.file.readAsDataURL(exp.audio1.pathshort, exp.audio1.filename).then((result) => {
          console.log(result);
          let blob = new Blob([result], {type: "audio/3gpp"});

          formData.append('uploaded_file', blob, exp.audio1.filename);


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

          /* if (exp.audio2 != undefined) {
             try {

               formData.append('audio2', exp.audio2.filename);
               formData.append('uploaded_file2', new Blob(exp.audio2.file), exp.audio2.filename);
             } catch {
               console.log('no se paso el audio2');
             }
           }*/

        });

        //formData.append('uploaded_file', new Blob([exp.audio1.pathshort + exp.audio1.filename], {type: 'audio/3gpp'}), exp.audio1.filename);
      } catch {
        console.log('no se paso el audio');
      }
    }


  }


}
