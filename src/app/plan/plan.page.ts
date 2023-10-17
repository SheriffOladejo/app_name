import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,IonModal,ModalController,ActionSheetController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { GoaladdPage } from '../goaladd/goaladd.page';
import { ApplePayEventsEnum, GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { HttpClient, HttpParams } from '@angular/common/http';
import { first, lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class PlanPage implements OnInit {
  
 @ViewChild(IonModal) modal!: IonModal;

  hasClick:any = false;
  data:any;
  fakeData:any = [1,2,4,5,6,7];
  currency:any;
  user_plan:any;
  user:any;
  text:any;
  admin:any;

  constructor(public server : ServerService,public otherService : OtherService,private modalCtrl: ModalController,private http: HttpClient) {

    this.otherService.statusBar("#009688",2);

    const text = localStorage.getItem('app_lang');
    
    if(text !== null) 
    {
      this.text =  JSON.parse(text);
      this.text = this.text.text;
    }

  }

  ngOnInit() 
  {
  }

  ionViewDidEnter(){
   
    this.loadData();

  }

  async loadData()
  {
    this.server.getPlan().subscribe((response:any) => {

    this.data      = response.data;
    this.user_plan = response.user_plan;
    this.user      = response.user;
    this.admin     = response.admin;

    Stripe.initialize({
      publishableKey: response.admin.stripe_key,
    });

    console.log(response.stripe_key);

    });
  }

  httpPost(amount:any)
  {
    const body = {user : localStorage.getItem('user_id'),total : amount}

    return this.http.post<any>(this.server.getApiUrl() + 'stripePayment', body).pipe(first());
  }

  async paymentSheet(plan:any) {

    this.otherService.showLoading();

    /*
    With PaymentSheet, you can make payments in a single flow. 
    As soon as the User presses the payment button, 
    the payment is completed. (If you want user have some flow after that, 
    please use paymentFlow method)
    */

    try {
      // be able to get event of PaymentSheet
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });
    
      // const data = new HttpParams({
      //   fromObject: this.data
      // });
      // Connect to your backend endpoint, and get every key.
      const data$ = this.httpPost(plan.amount);

      console.log(data$);

      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);

      // prepare PaymentSheet with CreatePaymentSheetOption.
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: "Wise Spend"
      });

      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      
      this.otherService.hideLoading();

      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
      
      this.assignPlan(this.splitAndJoin(paymentIntent),plan);
      
      }
      else
      {
        this.otherService.toast(this.text.payment_cancel);
      }

    } catch(e) {
      this.otherService.hideLoading();
      this.otherService.toast(this.text.payment_cancel);
    }
  }


  splitAndJoin(paymentIntent:any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    return result;
  }

  async assignPlan(pid:any,plan:any)
  {
    this.otherService.showLoading();

    this.server.assignPlan(pid,plan.id).subscribe((response:any) => {

    this.otherService.toast(this.text.thanks+" "+plan.title);

    this.otherService.hideLoading();

    this.otherService.redirect("home","root");

    });
  }
}
