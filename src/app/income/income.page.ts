import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,IonModal,ModalController,ActionSheetController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { IncomeaddPage } from '../incomeadd/incomeadd.page';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { ActivatedRoute } from '@angular/router';
import { Ng2SearchPipe } from 'ng2-search-filter';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class IncomePage implements OnInit {
  
  hasClick:any = false;
  data:any;
  fakeData:any = [1,2,4,5];
  total:any;
  banks:any;
  url:any;
  type:any;
  title:any;
  allData:any;
  term:any;
  currency:any;
  currentPage = 1;
  hasPlan:any;
  text:any;
  constructor(private ng2SearchPipe: Ng2SearchPipe,private route: ActivatedRoute,private photoViewer: PhotoViewer,public server : ServerService,public otherService : OtherService,private modalCtrl: ModalController,private actionSheetCtrl: ActionSheetController) {

  	this.type = this.route.snapshot.paramMap.get('type');

    this.currency = localStorage.getItem("currency");

    const text = localStorage.getItem('app_lang');
    
    if(text !== null) 
    {
      this.text =  JSON.parse(text);
      this.text = this.text.text;
    }

    this.title = this.type == 1 ? this.text.manage_income : this.text.manage_expense;

    if(this.type == 1)
    {
      this.otherService.statusBar("#009688",2);
    }
    else
    {
      this.otherService.statusBar("#eb445a",2);
    }
  }

  ngOnInit() 
  {
    this.loadData();
  }

  onSearchChange() {
    this.data = this.ng2SearchPipe.transform(this.allData, this.term);
  }

  async loadData()
  {
    this.server.getTrans(0,this.type,this.currentPage).subscribe((response:any) => {

    this.data     = response.data;
    this.allData  = response.data;
    this.banks    = response.banks;
    this.url      = response.url;  
    this.hasPlan  = response.hasPlan;
  
    });
  }

  async openModel(data:any = [])
  {
    if(!data.id && this.hasPlan.income == 0 || !data.id && this.hasPlan.expense == 0)
    {
      this.otherService.toast(this.text.plan_exp);

      return this.otherService.redirect("plan");
    }

    const allData = {data : data,banks : this.banks,type : this.type}

    const modal = await this.modalCtrl.create({
      component: IncomeaddPage,
      animated:true,
      mode:'ios',
      componentProps: allData

    });

   modal.onDidDismiss().then(data=>{
    
    if(data.data.data && data.data.data.length > 0)
    {
      this.data    = data.data.data;
      this.allData = data.data.data;
      this.hasPlan = data.data.hasPlan;
    }

    })

    return await modal.present();
  }

  async remove(id:any,bid:any)
  {
    this.otherService.confirm() .then(res => {
      if (res === 'ok') 
      {
        this.otherService.showLoading();

        this.server.removeTrans(id,bid,this.type).subscribe((response:any) => {
      
          this.data = response.data;
          this.total = response.total;

          this.otherService.hideLoading();

          this.otherService.toast(this.text.removed);
          
          });       
      }
    });
  }

  async viewImg(img:any)
  {
    this.photoViewer.show(this.url+"/"+img);
  }

  async loadMoreData(event: any) {
    this.currentPage++; // Increment the page number
    this.server.getTrans(0,this.type,this.currentPage).subscribe((response: any) => {
      // Append the new data to the existing data array
      this.data = [...this.data, ...response.data];
      event.target.complete(); // Notify the infinite scroll that loading is complete
    });

  }
}
