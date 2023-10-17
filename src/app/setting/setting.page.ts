import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class SettingPage implements OnInit {

  hasClick:any = false;
  data:any;
  type:any = 1;
  text:any;

  constructor(public server : ServerService,public otherService : OtherService) {

    this.otherService.statusBar("#009688",2);
    

    const user_data = localStorage.getItem('user_data');
    
    if(user_data !== null) 
    {
      this.data =  JSON.parse(user_data);
    }

    if(localStorage.getItem("has_valid") == "0")
    {
      this.otherService.showAd();
    }

    const text = localStorage.getItem('app_lang');
    
    if(text !== null) 
    {
      this.text =  JSON.parse(text);
      this.text = this.text.text;
    }
  }

  ngOnInit() {
  }

  async update(data:any)
  {

    this.hasClick = true;

    this.server.update(data).subscribe((response:any) => {

    this.hasClick = false;

    if(response.msg == "done")
    {
      localStorage.setItem("currency",response.user.currency);
      localStorage.setItem("user_data",JSON.stringify(response.user));

      this.otherService.toast(this.text.setting_success);
    }
    else
    {
      this.otherService.toast(response.error);
    }

    });

  }

  async updatePass(data:any)
  {
    if(data.new_password.length < 6)
    {
      this.otherService.toast(this.text.new_pass_error);
    }
    else if(data.new_password != data.c_password)
    {
      this.otherService.toast(this.text.conf_error);
    }
    else
    {
      this.update(data);

      this.type = 1;
      this.data.password = null;
      this.data.new_password = null;
      this.data.c_password = null;
    }
  }
}
