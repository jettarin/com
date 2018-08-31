import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

// Set Headers to post request
const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/x-www-form-urlencoded' },
  )
}


@Injectable()
export class RestProvider {
  apiUrl = 'http://203.157.82.34:8081';
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

  getUser(user){
    console.log(user);
    return new Promise((resolve) => {
      this.http.post(this.apiUrl+'/api/login', JSON.stringify(user), httpOptions).subscribe(res => {
      resolve(res);
      }, (err) => {
      console.log(err);
      
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

  getJobs(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/api/jobs').subscribe(data => {
        resolve(data);
      }, err => {
        
      });
    });
  }

  saveJob(j){
    return new Promise((resolve) => {
      this.http.post(this.apiUrl+'/api/save', JSON.stringify(j), httpOptions).subscribe(res => {
      resolve(res);
      }, (err) => {
      console.log(err);
      
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
