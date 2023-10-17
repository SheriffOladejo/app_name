import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.page.html',
  styleUrls: ['./viewreport.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewreportPage implements OnInit {

data:any;
currency:any;
text:any;

  constructor(public otherService : OtherService) {

    this.otherService.statusBar("#ffffff",1);

    const b = localStorage.getItem('report_data');
    
    if(b !== null) 
    {
      this.data =  JSON.parse(b);
    }

    this.currency = localStorage.getItem("currency");

    const text = localStorage.getItem('app_lang');
    
    if(text !== null) 
    {
      this.text =  JSON.parse(text);
      this.text = this.text.text;
    }
   }

  ngOnInit() {
  }

}
