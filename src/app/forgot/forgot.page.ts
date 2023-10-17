import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPage implements OnInit {

  setting:any;
  hasClick = false;
  text:any;

  constructor(public server : ServerService,public otherService : OtherService) {
    
    this.otherService.statusBar("#f4f5f8",1);

  }

  ngOnInit() {
  }

  forgot(data:any)
  {
    if(data.email.length == 0)
    {
      return this.otherService.toast("Please enter your email for continue.");
    }

    this.hasClick = true;

    this.server.forgot(data).subscribe((response:any) => {

    this.hasClick = false;

    if(response.msg != "done")
    {
      this.otherService.toast(response.error);
    }
    else
    {
      this.otherService.redirect("otp/"+response.user.id+"/2");
    }

    });

    return;
  }

}
