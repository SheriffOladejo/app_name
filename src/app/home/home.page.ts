import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,IonModal,ModalController,ActionSheetController,Platform,AlertController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class HomePage implements OnInit {

  hasClick:any = false;
  data:any;
  fakeData:any = [1,2,4,5];
  type:any = 0;
  currency:any;
  credit:any = [];
  debit:any = []
  url:any;
  text:any;
  user:any;
  subscription:any;
  
  constructor(public platform : Platform,private photoViewer: PhotoViewer,public server : ServerService,public otherService : OtherService,private route: ActivatedRoute,private modalCtrl: ModalController,public alertController: AlertController) {

    this.currency = localStorage.getItem("currency");

    const user = localStorage.getItem('user_data');
    
    if(user !== null) 
    {
      this.user =  JSON.parse(user);
    }

    const text = localStorage.getItem('app_lang');
    
    if(text !== null) 
    {
      this.text =  JSON.parse(text);
      this.text = this.text.text;
    }

  }

  ngOnInit() 
  {
    this.loadData();
  }

  ionViewDidEnter(){
    this.otherService.statusBar("#009688",2);

    this.subscription = this.platform.backButton.subscribe(()=>{
          
      this.presentAlertConfirm();

    });
  }

  ionViewWillLeave(){
      
    this.subscription.unsubscribe();
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: this.text.exit_app,
    message: this.text.exit_app_desc,
    buttons: [
      {
        text: this.text.s_canceled_order,
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: this.text.exit_app_confirm,
        handler: () => {
        
          App.exitApp();

        }
      }
    ]
  });

  await alert.present();
}

  async loadData()
  {
    this.server.homepage().subscribe((response:any) => {

    this.data     = response.data;

    localStorage.setItem("has_valid",response.data.valid);
    localStorage.setItem('push_id',response.data.push_id);

    
    });
  }

  async viewImg(img:any)
  {
    this.photoViewer.show(this.url+"/"+img);
  }

  async view(goal:any)
  {
    localStorage.setItem("goal_data",JSON.stringify(goal));

    this.otherService.redirect("goalview");
  }
}
