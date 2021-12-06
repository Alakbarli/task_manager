import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { OrganizationUser } from 'src/app/models/organization-user';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.scss']
})
export class EditAccountDialogComponent implements OnInit {
  load:boolean=false;
  newUserForm: FormGroup;
  errorMessages:Array<string>;
  user:OrganizationUser;
  isAdmin:boolean=false;
  constructor(
    private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditAccountDialogComponent>,
  ) { 
    if(this.accountService.getUserData("RoleName").data=="admin"){
      this.isAdmin=true;
    }
    this.accountService.getUserInfo().subscribe(
      res=>{
        this.load=true;
        this.user=res.data;
        this.setForm();
      }
    )
    
  }

  ngOnInit(): void {
    
  }
  setForm(){
    if(this.isAdmin){
      this.newUserForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      currentPassword: [''],
      newPassword: ['', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]],
      organizationName: [this.user.organizationName, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      address: [this.user.address, Validators.required],
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required]
      });
    }
    else{
      this.newUserForm = this.formBuilder.group({
        email: [this.user.email, [Validators.required, Validators.email]],
        currentPassword: [''],
        newPassword: ['', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]],
        name: [this.user.name, Validators.required],
        surname: [this.user.surname, Validators.required]
        });
    }
  }

  editUser() {
    if (this.newUserForm.invalid) {
      return;
    }
    this.errorMessages=null;
    this.accountService.editAccount(this.newUserForm.value).subscribe(res => {
      if(res.code==0){
        this.accountService.setJWT(res.data);
        this.dialogRef.close();
        this.dashboardService.showMessage("User edited",'','bg-success',2000);
      }
      else{
        this.errorMessages=res.errors;
        this.dashboardService.showMessage(this.errorMessages.toString(),'',"bg-danger");
      }
    })
  }

  get username() { return this.newUserForm.get("username") };
  get email() { return this.newUserForm.get("email") };
  get password() { return this.newUserForm.get("password") };
  get organizationName() { return this.newUserForm.get("organizationName") };
  get phoneNumber() { return this.newUserForm.get("phoneNumber") };
  get address() { return this.newUserForm.get("address") };
  get name() { return this.newUserForm.get("name") };
  get surname() { return this.newUserForm.get("surname") };
  get currentPassword() { return this.newUserForm.get("currentPassword") };
  get newPassword() { return this.newUserForm.get("newPassword") };

}
