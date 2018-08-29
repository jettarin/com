import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://localhost:8081';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }


  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/LISTOFVALUE/getAllMonth.php').subscribe(data => {
        resolve(data);
      }, err => {
        
      });
    });
  }

  getWorks(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/api/works').subscribe(data => {
        resolve(data);
      }, err => {
        
      });
    });
  }


  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/users', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }






}
