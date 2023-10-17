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
import { Ng2SearchPipe } from 'ng2-search-filter';

@Component({
  selector: 'app-trans',
  templateUrl: './trans.page.html',
  styleUrls: ['./trans.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class TransPage implements OnInit {

  hasClick:any = false;
  data:any;
  fakeData:any = [1,2,4,5];
  total:any;
  type:any = 1;
  bank_id:any;
  all:any;
  credit:any = [];
  debit:any = [];
  bank:any;
  banks:any;
  url:any;
  term:any;
  allData:any;
  allCredit:any;
  allDebit:any;
  currency:any;
  currentPage = 1;
  text:any;
  
  constructor(private ng2SearchPipe: Ng2SearchPipe,private photoViewer: PhotoViewer,public server : ServerService,public otherService : OtherService,private route: ActivatedRoute,private modalCtrl: ModalController) {

    this.otherService.statusBar("#009688",2);


  	this.bank_id = this.route.snapshot.paramMap.get('id');
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
    this.loadData();
  }

  onSearchChange(type:any) {
    
    if(type == 1)
    {
      this.data = this.ng2SearchPipe.transform(this.allData, this.term);
    }
    else if(type == 2)
    {
      this.credit = this.ng2SearchPipe.transform(this.allCredit, this.term);
    }
    else
    {
      this.debit = this.ng2SearchPipe.transform(this.allDebit, this.term);
    }
  }

  async loadData()
  {
    this.server.getTrans(this.bank_id,0,this.currentPage).subscribe((response:any) => {

    this.data     = response.data;
    this.allData  = response.data;
    this.bank     = response.bank;
    this.banks    = response.banks;
    this.url      = response.url;
    
    if(localStorage.getItem("has_valid") == "0")
    {
      this.otherService.showAd();
    }

    this.cutData();

    });
  }

  cutData()
  {
    this.credit = [];
    this.debit  = [];
    
    //Income
    for(var i =0;i<this.data.length;i++)
    {
      if(this.data[i].type == 1)
      {
        this.credit.push(this.data[i]);
      }
    }

    //Expense
    for(var i =0;i<this.data.length;i++)
    {
      if(this.data[i].type == 2)
      {
        this.debit.push(this.data[i]);
      }
    }

    this.allCredit = this.credit;
    this.allDebit  = this.debit;
  }

  async remove(id:any)
  {
    this.otherService.confirm() .then(res => {
      if (res === 'ok') 
      {
        this.otherService.showLoading();

        this.server.removeTrans(id,this.bank_id).subscribe((response:any) => {
      
          this.data = response.data;

          this.cutData();

          this.otherService.hideLoading();

          this.otherService.toast(this.text.removed);
          
          });       
      }
    });
  }

  async openModel(data:any = [])
  {
    const allData = {data : data,banks : this.banks}

    const modal = await this.modalCtrl.create({
      component: IncomeaddPage,
      animated:true,
      mode:'ios',
      componentProps: allData

    });

   modal.onDidDismiss().then(data=>{
    
    if(data.data.data && data.data.data.length > 0)
    {
      this.loadData();
    }

    })

    return await modal.present();
  }

  async viewImg(img:any)
  {
    this.photoViewer.show(this.url+"/"+img);
  }

  async loadMoreData(event: any) {
    this.currentPage++; // Increment the page number
    this.server.getTrans(this.bank_id,0,this.currentPage).subscribe((response: any) => {
      // Append the new data to the existing data array
      this.data = [...this.data, ...response.data];
      this.cutData();
      event.target.complete(); // Notify the infinite scroll that loading is complete
    });

  }
}
