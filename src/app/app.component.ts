import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule,Platform } from '@ionic/angular';
import { ServerService } from './service/server.service';
import { OtherService } from './service/other.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import OneSignal from 'onesignal-cordova-plugin';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {

user:any;
ad:any = false;
dir = 'ltr';
text:any;
appPages:any = [];
push_id:any;

  constructor(public server : ServerService,public otherService : OtherService,private platform: Platform) {

    const user = localStorage.getItem('user_data');
    
    if(user !== null) 
    {
      this.user =  JSON.parse(user);
    }

    if(localStorage.getItem("user_id") && localStorage.getItem("user_id") != undefined)
    {
      this.otherService.redirect("home","root");
    }
    else
    {
      this.otherService.redirect("welcome","root");
    }

    const text = localStorage.getItem('app_lang');
    
    if(text !== null) 
    {
      this.text =  JSON.parse(text);
      this.dir  = this.text.type == '1' ? 'rtl' : 'ltr';
      this.text = this.text.text;

      this.appPages = [
        { title: this.text.menu_home, url: '/home', icon: 'home' },
        { title: this.text.menu_income, url: '/income/1', icon: 'log-in' },
        { title: this.text.menu_expense, url: '/income/2', icon: 'log-out' },
        { title: this.text.menu_all, url: '/trans/0', icon: 'document' },
        { title: this.text.menu_reminder, url: '/reminder', icon: 'alarm' },
        { title: this.text.menu_goal, url: '/goal', icon: 'trophy' },
        { title: this.text.menu_rpeorting, url: '/report', icon: 'document' },
        { title: this.text.menu_payment, url: '/bank', icon: 'wallet' },
        { title: this.text.menu_setting, url: '/setting', icon: 'settings' },
        { title: this.text.menu_lang, url: '/language', icon: 'language' },
      ];

    }

    this.platform.ready().then(() => {
      StatusBar.setBackgroundColor({ color: '#009688' });
      StatusBar.setStyle({ style: Style.Dark });

      if(localStorage.getItem("push_id") && localStorage.getItem("push_id") != undefined)
      {
        const pushID = localStorage.getItem("push_id");

        this.OneSignalInit(pushID);
      }

    });
  }

  OneSignalInit(pushID:any): void {
  

    OneSignal.setAppId(pushID);
    OneSignal.setNotificationOpenedHandler(function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
  
    OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
        console.log("User accepted notifications: " + accepted);
    });
  
    if(localStorage.getItem('store_user_id') && localStorage.getItem('store_user_id') != undefined)
    {
        OneSignal.sendTags({user_id: localStorage.getItem('user_id')});
    }
  }

  async removeAccount()
  {
    this.otherService.confirm() .then(res => {
      if (res === 'ok') 
      {
        this.otherService.showLoading();

        this.server.deleteAccount().subscribe((response:any) => {
      
          this.otherService.hideLoading();

          this.otherService.toast(this.text.deleted);

          localStorage.removeItem("user_id");
          localStorage.removeItem("user_data");

          window.location.href = "/welcome";
          
          });       
      }
    });
  }

  async logout()
  {
    this.otherService.confirm() .then(res => {
      if (res === 'ok') 
      {
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_data");
        this.otherService.redirect("welcome","root");
      }
    });
  }
}
