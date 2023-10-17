import { Component, OnInit,ViewChild,ElementRef,NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,Platform,NavParams } from '@ionic/angular';
import { OtherService } from '../service/other.service';
import { ServerService } from '../service/server.service';


@Component({
  selector: 'app-reminderadd',
  templateUrl: './reminderadd.page.html',
  styleUrls: ['./reminderadd.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ReminderaddPage implements OnInit {

  data:any;
  hasClick = false;
  banks:any;
  reminder_date:any;
  hasImg:any;
  type:any;
  title:any;
  text:any;

  constructor(public navParams: NavParams,public otherService : OtherService,public server : ServerService) { 
  
    this.data       = navParams.get('data');

    if(this.data.reminder_date)
    {
      this.reminder_date = this.data.reminder_date;
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
    if(!this.reminder_date)
    {
      return this.otherService.toast(this.text.date_error);
    }

    this.hasClick = true;

    const allData = {

      user_id : localStorage.getItem("user_id"),
      id  : this.data.id ? this.data.id : "add",
      amount : data.amount,
      type : data.type,
      title: data.title,
      reminder_date : this.reminder_date

    }
    
    this.server.addReminder(allData).subscribe((response:any) => {

      this.hasClick = false;

      this.close(response);

      this.otherService.toast(this.text.reminder_added);

    });

    return;
  }

  
}
