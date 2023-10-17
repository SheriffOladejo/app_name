import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OtpPage implements OnInit {

  OTP:any = '';
  res:any;
  title:any;
  desc:any;
  hasClick = false;
  text:any;
  id:any;
  type:any;

  constructor(public server : ServerService,public otherService : OtherService,private route: ActivatedRoute) {
  
  this.id   = this.route.snapshot.paramMap.get('id');
  this.type = this.route.snapshot.paramMap.get('type');
  this.otherService.statusBar("#f4f5f8",1);


  }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.otherService.statusBar("#ffc927",2);
  }

  otpChange(e:any,next:any,prev:any)
  {
    if(e.target.value.length < 1 && prev)
    {
      prev.setFocus()
    }
    else if(next && e.target.value.length>0)
    {
      next.setFocus();
    }
    else
    {
     return 0;
    }
    
    return 0;
  }

  verify(data:any)
  {    
    if(!data.otp_1 || !data.otp_2 || !data.otp_3 || !data.otp_4)
    {
      return this.otherService.toast("Please enter valid OTP");
    }
    
    this.hasClick = true;

    this.server.verifyOtp(data,this.id).subscribe((response:any) => {
    
      if(response.msg != "done")
      {
        this.otherService.toast(response.error);
      }
      else
      {
        if(this.type == 1)
        {
            localStorage.setItem('user_id',response.user.id);
            
            localStorage.setItem('user_data', JSON.stringify(response.user));

            this.otherService.toast("Account Created Successfully.");

            window.location.href = "/home";
        }
        else
        {
          localStorage.setItem('temp_user_id', response.user.id);

          this.otherService.redirect("password","root");
        }
      }

    });

    return;
  }

  resend()
  {
    this.hasClick = true;

    this.server.resendCode(this.id).subscribe((response:any) => {
    
    this.hasClick = false;

    this.otherService.toast("Verification code resend successfully.");
   
    });
  }

}
