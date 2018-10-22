import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, ViewController ,NavParams, ToastController,ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { RestProvider } from '../../providers/rest/rest';




/**
 * Generated class for the AcceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accept',
  templateUrl: 'accept.html',
})
export class AcceptPage {
  isReadyToSave: boolean;
    form: FormGroup;
    data:any;
    user:any;
    job:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public viewCtrl: ViewController,
     formBuilder: FormBuilder,
     public toastCtrl: ToastController,
     public restProvider: RestProvider
    ) {

      this.data = navParams.data.data
      this.user = navParams.data.user
      console.log(this.data);
      
      this.form = formBuilder.group({
        comment: ['', Validators.required],
        description: [''],
        finishdate:moment().format('YYYY-MM-DD'),
        finishtime:moment().format('HH:mm:ss'),
        officeruser:this.user.Mem_ID,
        job_id:this.data.job_id

      });

      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceptPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
  done() {
    console.log("done");
    
    console.log(this.form);
    let toastSuccess = this.toastCtrl.create({
      message: 'Create Success',
      duration: 3000,
      position: 'top'
    });

    let toastErr = this.toastCtrl.create({
      message: 'Create Failed',
      duration: 3000,
      position: 'top'
    });
    if (!this.form.valid) { return; }

      this.restProvider.FinishJob(this.form.value).then(data => {
        this.job = data;
        console.log(this.job);
        
        if (this.job[0]>0) {
          toastSuccess.present();
          this.navCtrl.push('ListMasterPage');
          this.viewCtrl.dismiss(this.form.value);
        }else{
          toastErr.present();
        }
      });
  }

}
