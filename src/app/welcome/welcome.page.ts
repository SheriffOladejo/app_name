import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,AlertController,Platform} from '@ionic/angular';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { RouterLink } from '@angular/router';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
  
})
export class WelcomePage implements OnInit {

  img:any;
  admin:any;
  hasClick:any = false;
  subscription:any;

  constructor(public server : ServerService,public otherService : OtherService,public alertController: AlertController,public platform : Platform) {

    this.otherService.statusBar("#ffffff",1);
  }

  ngOnInit()
  { 
    this.loadData();
  }

  ionViewDidEnter(){
   
    this.subscription = this.platform.backButton.subscribe(()=>{
          
      this.presentAlertConfirm();

    });

  }

  ionViewWillLeave(){
      
    this.subscription.unsubscribe();
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: "Exit App",
    message: "Are you sure? Want to exit.",
    buttons: [
      {
        text: "Cancel",
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: "Yes Exit",
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
    this.otherService.showLoading();

    this.server.welcome().subscribe((response:any) => {

      this.img = response.img;
      this.admin = response.admin;
      
      localStorage.setItem('push_id',response.push_id);
      localStorage.setItem('setting',JSON.stringify(response.admin));
      localStorage.setItem("app_lang",JSON.stringify(response.lang));
      localStorage.setItem("lang_id","0");

      this.otherService.hideLoading();

      });
  }

  getStarted()
  {
    this.hasClick = true;

    this.otherService.redirectWithDelay('location');
  }
}
