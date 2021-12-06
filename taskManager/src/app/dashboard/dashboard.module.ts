import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FooterComponent } from './fixed-parts/footer/footer.component';
import { HeaderComponent } from './fixed-parts/header/header.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';
import { NewUserComponent } from './fixed-parts/dialogs/new-user/new-user.component';
import { NewTaskComponent } from './fixed-parts/dialogs/new-task/new-task.component';
import { SnackbarComponent } from './fixed-parts/snackbar/snackbar.component';
import { ConfirmDialogComponent } from './fixed-parts/dialogs/confirm-dialog/confirm-dialog.component';
import { EditAccountDialogComponent } from './fixed-parts/dialogs/edit-account-dialog/edit-account-dialog.component';



@NgModule({
  declarations: [DashboardComponent, FooterComponent, HeaderComponent, TaskComponent, UserComponent, NewUserComponent, NewTaskComponent, SnackbarComponent, ConfirmDialogComponent, EditAccountDialogComponent],
  imports: [
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class DashboardModule { }
