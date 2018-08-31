import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController ,NavParams, ToastController} from 'ionic-angular';
import * as moment from 'moment';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;
  timenow:any;
  user:any;
  job:any;

  form: FormGroup;

  constructor(public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    formBuilder: FormBuilder, 
    public camera: Camera,
    navParams: NavParams,
    private storage: Storage,
    public restProvider: RestProvider,
    public toastCtrl: ToastController) {
    
    this.item = navParams.data.params
    this.user = navParams.data.user
    console.log(this.user.data);
    console.log(this.form);
    
      
      
      this.form = formBuilder.group({
        profilePic: [''],
        name: ['', Validators.required],
        about: [''],
        datenow:moment().format('YYYY-MM-DD'),
        timenow:moment().format('HH:mm:ss'),
        dateacc:moment().format('YYYY-MM-DD'),
        timeacc:moment().add(10, 'minutes').format('HH:mm:ss'),
        timefinish:moment().add(20, 'minutes').format('HH:mm:ss'),
        type:this.item.lov_value,
        userid:this.user.data.Mem_ID,
        dep:this.user.data.Cost_SKTHM

        // userid:ra
      });
   
    
    
    
    
    
    

    

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
    
  }
  getUser(){
    return this.storage.get('user')
  }
  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }




  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
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
      this.restProvider.saveJob(this.form.value).then(data => {
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
