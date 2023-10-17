import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class LoginPage implements OnInit {

  hasClick:any = false;
  setting:any;
  text:any;
  email:any = "sushilasaharan9988@gmail.com";
  password:any = "google123";

  constructor(public server : ServerService,public otherService : OtherService) {

    this.otherService.statusBar("#f4f5f8",1);
  }

  ngOnInit() {
  }

  async login(data:any)
  {
    if(data.password.length == 0)
    {
      return this.otherService.toast("Please enter valid details");
    }

    this.hasClick = true;

    this.server.login(data).subscribe((response:any) => {

    if(response.msg != "done")
    {
      this.hasClick = false;

      this.otherService.toast(response.error);
    }
    else
    {
      localStorage.setItem('user_id',response.user.id);
      localStorage.setItem('currency',response.user.currency);
      localStorage.setItem('user_data',JSON.stringify(response.user));

      window.location.href = "/home";
    }

    });

    return;
  }
}
