import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OtherService } from '../service/other.service';
import { ServerService } from '../service/server.service';


@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LanguagePage implements OnInit {

  data:any;

  constructor(public otherService : OtherService,public server : ServerService) { }

  ngOnInit() 
  {
    this.loadData();
  }

  async loadData()
  {
    this.server.language().subscribe((response:any) => {
      
      this.data = response.data;
      
      });
  }

  async setLang(data:any)
  {
    localStorage.setItem("app_lang",JSON.stringify(data));
    localStorage.setItem("lang_id",data.id);

    this.otherService.toast("Language Changed Successfully.");

    window.location.href = "/home";
  }
}
