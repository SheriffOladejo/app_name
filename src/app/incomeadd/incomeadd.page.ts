import { Component, OnInit,ViewChild,ElementRef,NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,Platform,NavParams } from '@ionic/angular';
import { OtherService } from '../service/other.service';
import { ServerService } from '../service/server.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


@Component({
  selector: 'app-incomeadd',
  templateUrl: './incomeadd.page.html',
  styleUrls: ['./incomeadd.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IncomeaddPage implements OnInit {

  data:any;
  hasClick = false;
  banks:any;
  date_added:any;
  hasImg:any;
  type:any;
  title:any;
  text:any;

  constructor(public navParams: NavParams,public otherService : OtherService,public server : ServerService) { 
  
    this.data       = navParams.get('data');
    this.type       = navParams.get('type');
    this.banks      = navParams.get('banks');

    if(this.data.date_added)
    {
      this.date_added = this.data.date_added;
    }

    const text = localStorage.getItem('app_lang');
    
    if(text !== null) 
    {
      this.text =  JSON.parse(text);
      this.text = this.text.text;
    }

    this.title      = this.type == 1 ? this.text.new_income : this.text.new_exp;

  }

  ngOnInit() {
  } 


  async close(data:any = [])
  {
    this.otherService.closeModel(data);
  }

  async addNew(data:any,id = 0)
  {
    if(!this.date_added)
    {
      return this.otherService.toast(this.text.date_error);
    }

    this.hasClick = true;

    const allData = {

      user_id : localStorage.getItem("user_id"),
      bank_id : data.bank_id,
      amount  : data.amount,
      notes   : data.notes,
      date_added : this.date_added,
      type : this.type,
      id  : this.data.id ? this.data.id : "add"

    }
    
    this.server.addIncome(allData,id,this.type).subscribe((response:any) => {

    if(this.hasImg)
    {
      this.uploadImage(this.hasImg,response);
    }
    else
    {
      this.hasClick = false;

      this.close(response);

      this.otherService.toast(this.text.saved);
    }

    });

    return;
  }

  remove()
  {
    this.hasImg = null;
  }

  async selectImage() 
  { 
    const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
    });

    this.hasImg = image;

}

  async uploadImage(image:any,res:any)
  {
    const response = await fetch(image.webPath);
    const blob     = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, 'img.jpeg');
    this.uploadData(formData,res);
    
  }

  async uploadData(formData: FormData,res:any) 
  {
    this.server.uploadImage(formData,res.id).subscribe((response:any) => {
    
    this.hasClick = false;
    
    this.otherService.toast(this.text.saved);

    this.close(res);

    });
  }
}
