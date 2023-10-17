import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,IonModal,ModalController,ActionSheetController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { GoaladdPage } from '../goaladd/goaladd.page';

@Component({
  selector: 'app-goalview',
  templateUrl: './goalview.page.html',
  styleUrls: ['./goalview.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class GoalviewPage implements OnInit {
  
  hasClick:any = false;
  data:any;
  goal:any;
  currency:any;

  constructor(public server : ServerService,public otherService : OtherService,private modalCtrl: ModalController) {

    this.otherService.statusBar("#009688",2);
    this.currency = localStorage.getItem("currency");

    const text = localStorage.getItem('goal_data');
    
    if(text !== null) 
    {
      this.goal =  JSON.parse(text);
    }

  }

  ngOnInit() 
  {
  }

  async openModel(data:any = [])
  {
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
      this.otherService.goBack();
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
  
          this.otherService.hideLoading();

          this.otherService.toast("Goal Removed Successfully.");

          this.otherService.goBack();
          
          });       
      }
    });
  }

  async complete(id:any)
  {
    this.otherService.confirm() .then(res => {
      if (res === 'ok') 
      {

        this.otherService.showLoading();

        this.server.completeGoal(id).subscribe((response:any) => {

          this.otherService.hideLoading();

          this.otherService.toast("Congratulations! Goal Completed Successfully.");

          this.otherService.goBack();
          
          });       
      }
    });
  }
}
