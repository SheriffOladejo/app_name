import { Component, OnInit,ViewChild,ElementRef,NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,Platform,NavParams } from '@ionic/angular';
import { OtherService } from '../service/other.service';
import { ServerService } from '../service/server.service';


@Component({
  selector: 'app-bankadd',
  templateUrl: './bankadd.page.html',
  styleUrls: ['./bankadd.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BankaddPage implements OnInit {

  data:any;
  hasClick = false;

  constructor(public navParams: NavParams,public otherService : OtherService,public server : ServerService) { 
  

    this.data      = navParams.get('data');

  }

  ngOnInit() {
  } 

  async close(data:any = [])
  {
    this.otherService.closeModel(data);
  }

  async addNew(data:any,id = 0)
  {
    if(data.name.length == 0)
    {
      return this.otherService.toast("Please enter valid details");
    }

    this.hasClick = true;

    this.server.addBank(data,id).subscribe((response:any) => {

    this.hasClick = false;

    this.close(response);

    this.otherService.toast("New Payment Method Added Successfully.");

    });

    return;
  }
}
