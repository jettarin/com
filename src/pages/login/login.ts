import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import * as moment from 'moment';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: '30007',
    password: 'stat1'
  };

  // Our translated text strings

  user: any;
  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public restProvider: RestProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    navParams: NavParams
    ) {
      storage.clear()
     console.log(navParams.data);
      
      
  }
  
  // Attempt to login in through our User service
  doLogin() {


    let a = moment()
    let b = moment().add(7, 'day')
    console.log(a.valueOf());

    console.log(b.valueOf());
    
    // Unable to log in
    

    let toastErr = this.toastCtrl.create({
      message: 'Login Failed',
      duration: 3000,
      position: 'top'
    });

    this.restProvider.getUser(this.account)
    .then(data => {

      this.user = data;
      console.log(this.user);
      if (this.user.length>0) {
        let toastSuccess = this.toastCtrl.create({
          message: 'Login Success '+this.user[0].Mem_name+' '+this.user[0].Mem_lastname,
          duration: 3000,
          position: 'top'
        });
        toastSuccess.present();

        this.navCtrl.push(MainPage);
        this.storage.set('key', b.valueOf());
        this.storage.set('user',this.user[0])
        this.storage.set('permission',true)


      }else{
        toastErr.present();
      }
    });

  }
}
