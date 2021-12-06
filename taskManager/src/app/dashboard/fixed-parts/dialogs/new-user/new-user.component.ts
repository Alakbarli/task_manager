import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup;
  errorMessages:Array<string>;
  user:User;

  constructor(
    private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { 
    this.user=data;
    this.newUserForm = formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.user){
      this.newUserForm = this.formBuilder.group({
        id:[this.user.id],
        email: [this.user.email, [Validators.required, Validators.email]],
        name: [this.user.name, Validators.required],
        surname: [this.user.surname, Validators.required]
      });
    }
    
  }
  addNewUser() {
    if (this.newUserForm.invalid) {
      return;
    }
    this.errorMessages=null;
    this.accountService.operateUser(this.newUserForm.value,this.user?false:true).subscribe(res => {
      if(res.code==0){
        this.dialogRef.close();
        this.dashboardService.showMessage(this.user?"User edited":"User added",'','bg-success',2000);
      }
      else{
        this.errorMessages=res.errors;
        this.dashboardService.showMessage(this.errorMessages.toString(),'',"bg-danger");
      }
    })
  }
  get username() { return this.newUserForm.get("username") };
  get email() { return this.newUserForm.get("email") };
  get name() { return this.newUserForm.get("name") };
  get surname() { return this.newUserForm.get("surname") };

}
