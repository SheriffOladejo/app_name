import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  //url = "http://localhost/wise_spend/api/";
  url = "API_URL_HERE";

  constructor(private http: HttpClient) { }

  welcome()
  {
    return this.http.get(this.url+'welcome')
             .pipe(map(results => results));
  }

  homepage()
  {
    return this.http.get(this.url+'homepage?user_id='+localStorage.getItem("user_id"))
             .pipe(map(results => results));
  }

  addBank(data:any,id:any)
  {
    return this.http.post(this.url+'addBank?user_id='+localStorage.getItem("user_id")+"&id="+id,data)
             .pipe(map(results => results));
  }

  getBank()
  {
    return this.http.get(this.url+'getBank?user_id='+localStorage.getItem("user_id"))
             .pipe(map(results => results));
  }

  removeBank(id:any)
  {
    return this.http.get(this.url+'removeBank?user_id='+localStorage.getItem("user_id")+"&id="+id)
             .pipe(map(results => results));
  }

  getTrans(id = 0,type:any = 0,page = 1)
  {
    return this.http.get(this.url+'getTrans?user_id='+localStorage.getItem("user_id")+'&bank_id='+id+'&type='+type+'&page='+page)
             .pipe(map(results => results));
  }

  removeTrans(id:any,bank_id:any,type:any = 0)
  {
    return this.http.get(this.url+'removeTrans?user_id='+localStorage.getItem("user_id")+"&id="+id+'&bank_id='+bank_id+"&type="+type)
             .pipe(map(results => results));
  }

  addIncome(data:any,id:any,type:any = 0)
  {
    return this.http.post(this.url+'addIncome?user_id='+localStorage.getItem("user_id")+"&id="+id+"&type="+type,data)
             .pipe(map(results => results));
  }

  uploadImage(data:any,id:any)
  {
    return this.http.post(this.url+'uploadImage?user_id='+localStorage.getItem("user_id")+"&id="+id,data)
             .pipe(map(results => results));
  }

  transfer(data:any)
  {
    return this.http.post(this.url+'transfer?user_id='+localStorage.getItem("user_id"),data)
             .pipe(map(results => results));
  }
  
  addGoal(data:any)
  {
    return this.http.post(this.url+'addGoal?user_id='+localStorage.getItem("user_id"),data)
             .pipe(map(results => results));
  }

  getGoal()
  {
    return this.http.get(this.url+'getGoal?user_id='+localStorage.getItem("user_id"))
             .pipe(map(results => results));
  }

  removeGoal(id:any)
  {
    return this.http.get(this.url+'removeGoal?user_id='+localStorage.getItem("user_id")+"&id="+id)
             .pipe(map(results => results));
  }

  completeGoal(id:any)
  {
    return this.http.get(this.url+'completeGoal?user_id='+localStorage.getItem("user_id")+"&id="+id)
             .pipe(map(results => results));
  }

  addReminder(data:any)
  {
    return this.http.post(this.url+'addReminder?user_id='+localStorage.getItem("user_id"),data)
             .pipe(map(results => results));
  }

  getReminder()
  {
    return this.http.get(this.url+'getReminder?user_id='+localStorage.getItem("user_id"))
             .pipe(map(results => results));
  }

  removeReminder(id:any)
  {
    return this.http.get(this.url+'removeReminder?user_id='+localStorage.getItem("user_id")+"&id="+id)
             .pipe(map(results => results));
  }

  update(data:any)
  {
    return this.http.post(this.url+'update?user_id='+localStorage.getItem("user_id"),data)
             .pipe(map(results => results));
  }

  getReport(from:any,to:any,type:any,bank_id:any)
  {
    return this.http.get(this.url+'getReport?user_id='+localStorage.getItem("user_id")+"&from="+from+"&to="+to+"&type="+type+"&bank_id="+bank_id)
             .pipe(map(results => results));
  }

  signup(data:any)
  {
    return this.http.post(this.url+"signup",data)
             .pipe(map(results => results));
  }

  login(data:any)
  {
    return this.http.post(this.url+"login",data)
             .pipe(map(results => results));
  }

  resendCode(id:any)
  {
    return this.http.get(this.url+"resendCode?id="+id)
             .pipe(map(results => results));
  }

  verifyOtp(data:any,id:any)
  {
    return this.http.post(this.url+"verifyOtp?id="+id,data)
             .pipe(map(results => results));
  }

  forgot(data:any)
  {
    return this.http.post(this.url+"forgot",data)
             .pipe(map(results => results));
  }

  resetPassword(data:any,id:any)
  {
    return this.http.post(this.url+"resetPassword?id="+id,data)
             .pipe(map(results => results));
  }

  deleteAccount()
  {
    return this.http.get(this.url+"deleteAccount?user_id="+localStorage.getItem("user_id"))
             .pipe(map(results => results));
  }

  updateData(data:any)
  {
    return this.http.post(this.url+"updateData?user_id="+localStorage.getItem("user_id"),data)
             .pipe(map(results => results));
  }

  language()
  {
    return this.http.get(this.url+"language")
             .pipe(map(results => results));
  }

  page()
  {
    return this.http.get(this.url+"page?lid="+localStorage.getItem('lang_id'))
             .pipe(map(results => results));
  }

  contact(data:any)
  {
    return this.http.post(this.url+"contact",data)
             .pipe(map(results => results));
  }

  getPlan()
  {
    return this.http.get(this.url+"getPlan?user_id="+localStorage.getItem('user_id'))
             .pipe(map(results => results));
  }

  assignPlan(pid:any,plan_id:any)
  {
    return this.http.get(this.url+"assignPlan?user_id="+localStorage.getItem('user_id')+"&payment_id="+pid+"&plan_id="+plan_id)
             .pipe(map(results => results));
  }

  getApiUrl()
  {
    return this.url;
  }
}
