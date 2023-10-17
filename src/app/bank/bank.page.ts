import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,IonModal,ModalController,ActionSheetController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { BankaddPage } from '../bankadd/bankadd.page';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.page.html',
  styleUrls: ['./bank.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class BankPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  
  hasClick:any = false;
  data:any;
  fakeData:any = [1,2,4,5];
  total:any;
  currency:any;

  constructor(public server : ServerService,public otherService : OtherService,private modalCtrl: ModalController,private actionSheetCtrl: ActionSheetController) {

    this.otherService.statusBar("#009688",2);

    this.currency = localStorage.getItem("currency");
  }

  ngOnInit() 
  {
    
  }

  ionViewDidEnter(){
    
    this.loadData();
  }

  async loadData()
  {
    this.server.getBank().subscribe((response:any) => {

    this.data  = response.data;
    this.total = response.total;

    localStorage.setItem("all_banks",JSON.stringify(this.data));

    if(localStorage.getItem("has_valid") == "0")
    {
      this.otherService.showAd();
    }

    });
  }

  async openModel(data:any = [])
  {
    const allData = {data : data}

    const modal = await this.modalCtrl.create({
      component: BankaddPage,
      animated:true,
      mode:'ios',
      componentProps: allData

    });

   modal.onDidDismiss().then(data=>{
    
    if(data.data.data && data.data.data.length > 0)
    {
      this.data = data.data.data;
      this.total = data.data.total;
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

        this.server.removeBank(id).subscribe((response:any) => {
      
          this.data = response.data;
          this.total = response.total;

          this.otherService.hideLoading();

          this.otherService.toast("Bank Removed Successfully.");
          
          });       
      }
    });
  }

  async presentActionSheet(bank:any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      mode : 'md',
      buttons: [
        {
          text: 'Transections',
          icon : 'document-outline',
          handler: () => {
            this.otherService.redirect("trans/"+bank.id)
          },
        },
        {
          text: 'Transfer Funds',
          icon : 'refresh-outline',
          handler: () => {

            localStorage.setItem("to_bank",bank.name);

            this.otherService.redirect("transfer/"+bank.id)
          },
        },
        {
          text: 'Edit Details',
          role: 'destructive',
          icon : 'create-outline',
          handler: () => {
            this.openModel(bank);
          },
        },
        {
          text: 'Delete',
          icon : 'trash-outline',
          handler: () => {
            this.remove(bank.id);
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
