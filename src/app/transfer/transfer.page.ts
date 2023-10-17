import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,IonModal,ModalController,ActionSheetController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class TransferPage implements OnInit {

  hasClick:any = false;
  to_bank:any;
  all_bank:any;
  bank_id:any;
  date_added:any;
  banks:any = [];

  constructor(public server : ServerService,public otherService : OtherService,private route: ActivatedRoute,private modalCtrl: ModalController) {

    this.otherService.statusBar("#009688",2);


  	this.bank_id = this.route.snapshot.paramMap.get('id');
    this.to_bank = localStorage.getItem("to_bank");
    
    const all = localStorage.getItem('all_banks');
    
    if(all !== null) 
    {
      this.all_bank =  JSON.parse(all);

      for(var i =0;i<this.all_bank.length;i++)
      {
        if(this.all_bank[i].id != this.bank_id)
        {
          this.banks.push(this.all_bank[i]);
        }
      }
    }

  }

  ngOnInit() 
  {
    if(localStorage.getItem("has_valid") == "0")
    {
      this.otherService.showAd();
    }
  }

  async addNew(data:any)
  {
    if(!this.date_added)
    {
      return this.otherService.toast("Please select date for continue");
    }

    this.hasClick = true;

    const allData = {

    user_id : localStorage.getItem("user_id"),
    from    : data.from,
    bank_id : this.bank_id,
    amount  : data.amount,
    notes   : data.notes,
    date_added : this.date_added,
    id : "add"

    }

    this.server.transfer(allData).subscribe((response:any) => {

    this.hasClick = false;

    this.otherService.toast("Funds transferred successfully.");

    this.otherService.goBack();

    });

    return;
  }

}
