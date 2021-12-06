import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from '../../dashboard.service';
import { EditAccountDialogComponent } from '../dialogs/edit-account-dialog/edit-account-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  errorMessages:Array<string>;
  fullName:string;
  orgName:string;
  constructor(
    private dashboardService:DashboardService,
    private accountService:AccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fullName=this.accountService.getUserData("name").data+" "+this.accountService.getUserData("surname").data;
    this.orgName=this.accountService.getUserData("OrganizationName").data
  }
  
  Logout(){
    this.accountService.LogOut();
  }

  edit(){
    let dialogRef = this.dialog.open(EditAccountDialogComponent, {
      disableClose: true,
      width: '450px',
      maxHeight:'90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fullName=this.accountService.getUserData("name").data+" "+this.accountService.getUserData("surname").data;
      this.orgName=this.accountService.getUserData("OrganizationName").data
    });
  }

}
