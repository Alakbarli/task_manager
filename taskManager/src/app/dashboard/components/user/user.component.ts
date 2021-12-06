import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from '../../dashboard.service';
import { ConfirmDialogComponent } from '../../fixed-parts/dialogs/confirm-dialog/confirm-dialog.component';
import { NewUserComponent } from '../../fixed-parts/dialogs/new-user/new-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList:Array<User>;
  errorMessages:Array<string>;
  isAdmin:boolean;
  constructor(
    private dashboardService:DashboardService,
    private accountService:AccountService,
    private router:Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { 
      if(this.accountService.getUserData("RoleName").data=="admin"){
        this.isAdmin=true;
        this.displayedColumns.push('operation');
      }
    }

  displayedColumns: string[] = ['name', 'surname', 'email'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.dashboardService.getUserList().subscribe(
      data=>{
        this.userList=data.data;
        this.dataSource.data = data.data;
        this.dataSource.paginator = this.paginator;
      },
      err=>{

      }
    )
  }
  new(){
    if(!this.isAdmin){
      return;
    }
    let dialogRef = this.dialog.open(NewUserComponent, {
      disableClose: true,
      width: '350px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
  edit(id:string){
    if(!this.isAdmin){
      return;
    }
    let dialogRef = this.dialog.open(NewUserComponent, {
      disableClose: true,
      width: '350px',
      data: this.userList.find(x=>x.id==id)
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
  delete(id:any){
    if(!this.isAdmin){
      return;
    }
    let user=this.userList.find(x=>x.id==id);
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '350px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
          this.errorMessages=null;
          this.accountService.deleteUser(user).subscribe(res => {
            if(res.code==0){
              this.dashboardService.showMessage("User deleted",'','bg-success',2000);
              this.getUsers();
            }
            else{
              this.errorMessages=res.errors;
              this.dashboardService.showMessage(this.errorMessages.toString(),'',"bg-danger");
            }
          })
      }
    });
  }
}
