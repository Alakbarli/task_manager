import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { AccountService } from '../services/account.service';
import { DashboardComponent } from './dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl:string;
  constructor(private http:HttpClient,private snackBar: MatSnackBar,) { 
  }
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: DashboardComponent,
      children: routes,
      data: { reuse: true },
    };
  }

  //Get

  getTaskList(): Observable<any> {
    this.apiUrl = AppConfig.settings.urls.resourceApi;
    let url = this.apiUrl + '/task/gettasks';
    return this.http.get<any>(url);
  }
  getUserList(): Observable<any> {
    this.apiUrl = AppConfig.settings.urls.resourceApi;
    let url = this.apiUrl + '/user/getusers';
    return this.http.get<any>(url);
  }

  getStatusList(): Observable<any> {
    this.apiUrl = AppConfig.settings.urls.resourceApi;
    let url = this.apiUrl + '/lookup/getstatuses';
    return this.http.get<any>(url);
  }

  showMessage(message:string,action:string='',panelClass:string='bg-success',duration:number=null){
    let sb = this.snackBar.open(message, action==''&&duration==null?'Close':'', {
      duration: duration,
      panelClass: panelClass,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
}
