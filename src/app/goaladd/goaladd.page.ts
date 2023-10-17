import { Component, OnInit,ViewChild,ElementRef,NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,Platform,NavParams } from '@ionic/angular';
import { OtherService } from '../service/other.service';
import { ServerService } from '../service/server.service';


@Component({
  selector: 'app-goaladd',
  templateUrl: './goaladd.page.html',
  styleUrls: ['./goaladd.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GoaladdPage implements OnInit {

  data:any;
  hasClick = false;
  till_date:any;
  text:any;

  constructor(public navParams: NavParams,public otherService : OtherService,public server : ServerService) { 
  
    this.data       = navParams.get('data');

    if(this.data.till_date)
    {
      this.till_date = this.data.till_date;
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


  async close(data:any = [])
  {
    this.otherService.closeModel(data);
  }

  async addNew(data:any,id = 0)
  {
    if(!this.till_date)
    {
      return this.otherService.toast("Please select date.");
    }

    this.hasClick = true;

    const allData = {

      user_id : localStorage.getItem("user_id"),
      id  : this.data.id ? this.data.id : "add",
      total_amount : data.total_amount,
      paid_amount : data.paid_amount,
      till_date : this.till_date,
      title: data.title

    }
    
    this.server.addGoal(allData).subscribe((response:any) => {

      this.hasClick = false;

      this.close(response);

      this.otherService.toast("New Goal Added Successfully.");

    });

    return;
  }
}
