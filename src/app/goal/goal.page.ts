import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,IonModal,ModalController,ActionSheetController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { GoaladdPage } from '../goaladd/goaladd.page';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.page.html',
  styleUrls: ['./goal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class GoalPage implements OnInit {
  
 @ViewChild(IonModal) modal!: IonModal;

  hasClick:any = false;
  data:any;
  fakeData:any = [1,2,4,5,6,7];
  total:any;
  currency:any;
  text:any;
  hasPlan:any;

  constructor(public server : ServerService,public otherService : OtherService,private modalCtrl: ModalController) {

    this.otherService.statusBar("#f4f5f8",1);

    this.currency = localStorage.getItem("currency");

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
    this.server.getGoal().subscribe((response:any) => {

    this.data   = response.data;
    this.total  = response.total;
    this.hasPlan = response.hasPlan;


    if(localStorage.getItem("has_valid") == "0")
    {
      this.otherService.showAd();
    }

    });
  }

  async openModel(data:any = [])
  {
    if(!data.id && this.hasPlan.income == 0 || !data.id && this.hasPlan.expense == 0)
    {
      this.otherService.toast(this.text.plan_exp);

      return this.otherService.redirect("plan");
    }

    const allData = {data : data}

    const modal = await this.modalCtrl.create({
      component: GoaladdPage,
      animated:true,
      mode:'ios',
      componentProps: allData,

    });

   modal.onDidDismiss().then(data=>{
    
    if(data.data.data && data.data.data.length > 0)
    { 
      this.data  = data.data.data;
      this.total = data.data.total;
      this.hasPlan = data.data.hasPlan;

    }

    })

    return await modal.present();
  }

  async remove(id:any)
  {
    this.otherService.confirm() .then(res => {
      if (res === 'ok') 
      {
        this.otherService.showLoading();

        this.server.removeGoal(id).subscribe((response:any) => {
          this.modal.dismiss(null, 'cancel');
          
          this.data  = response.data;
          this.total = response.total;

          this.otherService.hideLoading();

          this.otherService.toast(this.text.removed);
          
          });       
      }
    });
  }

  async complete(id:any)
  {
    this.modal.dismiss(null, 'cancel');

    this.otherService.confirm() .then(res => {
      if (res === 'ok') 
      {

        this.otherService.showLoading();

        this.server.completeGoal(id).subscribe((response:any) => {
          
          this.data  = response.data;
          this.total = response.total;

          this.otherService.hideLoading();

          this.otherService.toast(this.text.goal_complete);
          
          });       
      }
    });
  }

  async view(goal:any)
  {
    localStorage.setItem("goal_data",JSON.stringify(goal));

    this.otherService.redirect("goalview");
  }
}
