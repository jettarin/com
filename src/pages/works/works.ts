import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';


/**
 * Generated class for the WorksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-works',
  templateUrl: 'works.html',
})
export class WorksPage {
  works: any;
  user:any;
  // items:['1','2','3']
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public restProvider: RestProvider,
    public modalCtrl: ModalController) {
    console.log("data=",navParams.data);
    this.user = navParams.data
    this.worklist();
  }




  worklist (){
        
    var items = ['bear','cheetah', 'duck', 'eagle', 'elephant','giraffe','iguana','kitten','lion','mouse','puppy','rabbit','turtle'];
    console.log((items));
    console.log(Math.floor(Math.random() * 6) + 0  );
    
    this.restProvider.getWorks()
    .then(data => {
      this.works = data;
      this.works.forEach(i => {
        i.profilePic = 'assets/img/speakers/'+items[Math.floor(Math.random() * 12) + 0 ]+'.jpg'
      });
      console.log(this.works);
    });
  }

  openItem(v) {

    let addModal = this.modalCtrl.create('ItemCreatePage',{params:v,user:this.user});
    addModal.onDidDismiss(item => {
      // if (item) {
      //   this.items.add(item);
      // }
    })
    addModal.present();
  }

  ionViewDidLoad() {


  }

}
