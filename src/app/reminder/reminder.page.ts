import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,IonModal,ModalController,ActionSheetController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { ReminderaddPage } from '../reminderadd/reminderadd.page';
import { Ng2SearchPipe } from 'ng2-search-filter';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ReminderPage implements OnInit {
  
  hasClick:any = false;
  data:any;
  fakeData:any = [1,2,4,5,6,7];
  currency:any;
  allData:any;
  term:any;
  text:any
  hasPlan:any;

  constructor(private ng2SearchPipe: Ng2SearchPipe,public server : ServerService,public otherService : OtherService,private modalCtrl: ModalController) {

    this.otherService.statusBar("#009688",2);
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

  onSearchChange() {
    
    this.data = this.ng2SearchPipe.transform(this.allData, this.term);
  }

  ionViewDidEnter(){
    
    this.loadData();

  }

  async loadData()
  {
    this.server.getReminder().subscribe((response:any) => {

    this.data     = response.data;
    this.allData  = response.data;
    this.hasPlan  = response.hasPlan;

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
      component: ReminderaddPage,
      animated:true,
      mode:'ios',
      componentProps: allData

    });

   modal.onDidDismiss().then(data=>{
    
    if(data.data.data && data.data.data.length > 0)
    {
      this.data = data.data.data;
      this.allData = data.data.data;
      this.hasPlan  = data.data.hasPlan;

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

        this.server.removeReminder(id).subscribe((response:any) => {
      
          this.data = response.data;

          this.otherService.hideLoading();

          this.otherService.toast(this.text.removed);
          
          });       
      }
    });
  }
}
