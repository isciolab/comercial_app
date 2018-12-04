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

        formData.append('audio1', exp.audio1.filename);

        this.file.readAsDataURL(exp.audio1.pathshort, exp.audio1.filename).then((result) => {

          let blob = new Blob([result], {type: "audio/3gpp"});

          formData.append('uploaded_file', blob, exp.audio1.filename);


          if (exp.audio2 != undefined) {
            try {

              this.file.readAsDataURL(exp.audio2.pathshort, exp.audio2.filename).then((result2) => {

                let blob2 = new Blob([result2], {type: "audio/3gpp"});

                formData.append('uploaded_file2', blob2, exp.audio2.filename);


                return this.makerequestEperiences(headers, formData)
                  .then(data => {
                    return data;
                  });
              });

            } catch {
              console.log('no se paso el audio2');
            }
          } else {
            return this.makerequestEperiences(headers, formData)
              .then(data => {
                return data;
              });
          }

        });

        //formData.append('uploaded_file', new Blob([exp.audio1.pathshort + exp.audio1.filename], {type: 'audio/3gpp'}), exp.audio1.filename);
      } catch {
        console.log('no se paso el audio');

      }


    } else {

      if (exp.audio2 != undefined) {
        try {

          this.file.readAsDataURL(exp.audio2.pathshort, exp.audio2.filename).then((result2) => {

            let blob2 = new Blob([result2], {type: "audio/x-wav"});

            formData.append('uploaded_file2', blob2, exp.audio2.filename);


            return this.makerequestEperiences(headers, formData)
              .then(data => {
                return data;
              });
          });

        } catch {
          console.log('no se paso el audio2');
        }
      } else {
        return this.makerequestEperiences(headers, formData)
          .then(data => {
            return data;
          });
      }
    }
    return this.makerequestEperiences(headers, formData)
      .then(data => {
        return data;
      });

  }

  makerequestEperiences(headers, formData) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'experience/register', formData, {
        headers: headers,

        // params: new HttpParams().set('id', '3'),
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


  sendCall(call) {


    let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data;boundary=----');
    let formData = new FormData();

    formData.append('addressee', call.phonenumber);
    formData.append('duration_call', call.duration);
    formData.append('user', call.user);
    formData.append('origin_number', call.origin_number ? call.origin_number : '');
    formData.append('location', call.location ? call.location : '');
    if (call.filename != undefined) {
      try {

        formData.append('audio1', call.filename);

        this.file.readAsDataURL(call.pathshort, call.filename).then((result) => {
          console.log(result);
          let blob = new Blob([result], {type: "audio/3gpp"});
          console.log(blob);
          formData.append('uploaded_file', blob, call.filename);
          return this.makerequestCall(headers, formData)
            .then(data => {
              return data;
            });

        });

        //formData.append('uploaded_file', new Blob([exp.audio1.pathshort + exp.audio1.filename], {type: 'audio/3gpp'}), exp.audio1.filename);
      } catch {
        console.log('no se paso el audio');

      }
    }
    return this.makerequestCall(headers, formData)
      .then(data => {
        return data;
      });

  }

  makerequestCall(headers, formData) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'calls/registerCall', formData, {
        headers: headers,

        // params: new HttpParams().set('id', '3'),
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }


}
