import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,IonModal,ModalController,ActionSheetController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { ActivatedRoute } from '@angular/router';
import { IncomeaddPage } from '../incomeadd/incomeadd.page';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ReportPage implements OnInit {

  hasClick:any = false;
  data:any;
  fakeData:any = [1,2,4,5];
  banks:any;
  from:any;
  to:any;
  type:any;
  bank_id:any;
  text:any;

  constructor(private photoViewer: PhotoViewer,public server : ServerService,public otherService : OtherService,private route: ActivatedRoute,private modalCtrl: ModalController) {

    this.otherService.statusBar("#009688",2);

    const b = localStorage.getItem('all_banks');
    
    if(b !== null) 
    {
      this.banks =  JSON.parse(b);
    }

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

  async getReport()
  {

    if(!this.from || !this.to)
    {
      return this.otherService.toast(this.text.date_error);
    }

    this.hasClick = true;

    const type    = this.type ? this.type : 0;
    const bank_id = this.bank_id ? this.bank_id : 0;

    this.server.getReport(this.from,this.to,type,bank_id).subscribe((response:any) => {

    this.hasClick = false;
    
    console.log(response.data.list);

    if(response.data.list && response.data.list.length > 0)
    {
      localStorage.setItem("report_data",JSON.stringify(response.data));

      this.otherService.redirect("viewreport");
    }
    else
    {
      this.otherService.toast(this.text.no_data);
    }

    });

    return;
  }

  async viewImg(img:any)
  {
    //this.photoViewer.show(this.url+"/"+img);
  }
}
