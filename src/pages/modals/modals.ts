import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ModalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html',
})
export class ModalsPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public viewCtrl: ViewController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalsPage');
  }
  cancel() {
    this.viewCtrl.dismiss();
  }

  selectDepartment (d){
    console.log(d);
    
    this.storage.set('department',d)
    this.viewCtrl.dismiss();
    // this.viewCtrl.department = d
    
  }

}
