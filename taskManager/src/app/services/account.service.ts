import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { DashboardService } from '../dashboard/dashboard.service';
import { register } from '../models/Auth/register.model';
import { Newtask } from '../models/newtask';
import { OrganizationUser } from '../models/organization-user';
import { Task } from '../models/task';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  myAppUrl: string;
  constructor(private http: HttpClient, private router: Router) {
    this.myAppUrl = AppConfig.settings.urls.resourceApi;
  }
  createJWT(token, returnToUrl) {
    localStorage.setItem("token", token);
      this.router.navigate([returnToUrl]);
  }

  setJWT(token) {
    localStorage.setItem("token", token);
  }
  login(obj): Observable<any> {
    let url = this.myAppUrl + "/auth/login";
    return this.http.post<any>(url, obj);
  }
  
  getUserInfo(): Observable<any> {
    let url = this.myAppUrl + "/user/getuserinfo";
    return this.http.get<any>(url);
  }

  register(obj: register): Observable<any> {
    let url = this.myAppUrl + "/auth/register";
    return this.http.post<any>(url, obj);
  }
  operateUser(obj:User,isNew:boolean){
    let type=isNew?"adduser":"edituser";
    let url = this.myAppUrl + "/user/"+type;
    return this.http.post<any>(url, obj);
  }

  editAccount(obj:OrganizationUser){
    let data=new OrganizationUser();
    data.name=obj.name;
    data.surname=obj.surname;
    data.email=obj.email;
    data.address=obj.address;
    data.organizationName=obj.organizationName;
    data.phoneNumber=obj.phoneNumber;
    data.currentPassword=obj.currentPassword;
    data.newPassword=obj.newPassword;

    let url = this.myAppUrl + "/user/editaccount";
    return this.http.post<any>(url, data);
  }

  operateTask(obj:any,isNew:boolean){

    let data=new Newtask();
    data.id=obj.id
    data.title=obj.title;
    data.description=obj.description;
    data.deadline=obj.deadline;
    data.users=obj.users;
    data.statusId=obj.statusId;

    let type=isNew?"addtask":"edittask";
    let url = this.myAppUrl + "/task/"+type;
    return this.http.post<any>(url, data);
  }

  deleteUser(obj:User){
    let url = this.myAppUrl + "/user/deleteuser";
    return this.http.post<any>(url, obj);
  }

  deleteTask(id:number){
    let url = this.myAppUrl + "/task/deletetask";
    return this.http.post<any>(url, id);
  }

  getUserData(key:string) {
    if (localStorage.getItem("token")) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem("token"));
      if (decodedToken && decodedToken[key]) {
        return {data: decodedToken[key], errorCode: 0};
      } else {
        return {data: null, errorCode: 1};
      }
    } else {
      return {data: null, errorCode: 1};
    }
  }
  LogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(token);
  }
}
