import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServerService } from '../service/server.service';
import { OtherService } from '../service/other.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ContactPage implements OnInit {

  text:any;
  hasClick = false;
  
  constructor(public server : ServerService,public otherService : OtherService) { 
  
    this.otherService.statusBar("#ffffff",2);

    const text = localStorage.getItem('app_lang');
    
    if(text !== null) 
    {
      this.text =  JSON.parse(text);
      this.text = this.text.text;
    }

  }

  ngOnInit() {
  }

  

  async send(data:any)
  {
    this.hasClick = true;

    this.server.contact(data).subscribe((response:any) => {
      
      this.hasClick = false;

      this.otherService.toast("Thank you! We have received your message & Contact you soon.");

      this.otherService.redirect("home");

      });
  }

}
