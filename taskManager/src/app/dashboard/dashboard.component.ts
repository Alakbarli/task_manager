import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../services/account.service';
import { DashboardService } from './dashboard.service';
import { EditAccountDialogComponent } from './fixed-parts/dialogs/edit-account-dialog/edit-account-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  errorMessages:Array<string>;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  

}
