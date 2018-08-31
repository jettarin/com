import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController ,NavParams} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  jobs: any;
  user: any;

  constructor(private storage: Storage,
    public navCtrl: NavController, 
    public modalCtrl: ModalController,  
    public restProvider: RestProvider, 
    navParams : NavParams) {
    moment.locale('th');
    
    
    
    this.storage.get('permission').then((val) => {
      console.log('Your name is', val);
      if (!val) {      
       this.logout()
      }
    });
    this.storage.get('user').then((val) => {
      this.user = val
      
    });

    
    
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    
    let urlImg = "http://203.157.82.34:3000/ens/jcrop/upload_pic/";
 
    
    this.restProvider.getJobs()
    .then(data => {
      this.jobs = data;
      this.jobs.forEach(e => {
        e.job_created = moment(e.job_date_created+' '+e.job_time_created).format('LLLL')
        e.pic_name = urlImg+e.pic_name
        e.fromnow = moment(e.job_date_created+' '+e.job_time_created).fromNow()
      });
      console.log(this.jobs);
    });
    
    
  }



  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {

  }

  logout(){
    this.navCtrl.push('LoginPage', {data:this.user})
  }
  gotoWorkList(){
    this.navCtrl.push('WorksPage' , {data:this.user})
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem() {
    
  }
}
