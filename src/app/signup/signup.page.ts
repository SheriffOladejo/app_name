import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class SignupPage implements OnInit {

  hasClick:any = false;

  constructor(public server : ServerService,public otherService : OtherService) {

    this.otherService.statusBar("#f4f5f8",1);
  }

  ngOnInit() {
  }

  async signup(data:any)
  {
    if(data.password.length < 6)
    {
      return this.otherService.toast("Password length should be atlest 6");
    }

    this.hasClick = true;

    this.server.signup(data).subscribe((response:any) => {

    this.hasClick = false;

    if(response.msg != "done")
    {
      this.otherService.toast(response.error);
    }
    else
    {
      this.otherService.redirect("otp/"+response.user.id+"/1");
    }

    });

    return;
  }
}
