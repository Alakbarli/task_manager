import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { Status } from 'src/app/models/status';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  newTaskForm: FormGroup;
  errorMessages:Array<string>;
  task:Task;
  statuses:Array<Status>;
  usersList:Array<User>;

  constructor(
    private formBuilder: FormBuilder, 
    private accountService: AccountService,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.task=data;
    this.newTaskForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      deadline: ['', Validators.required],
      statusId: ['', Validators.required],
      users: ['']
    });
   }

  ngOnInit(): void {
    this.getStatuses();
    this.getUsers();
    

    if(this.task){
      this.newTaskForm = this.formBuilder.group({
        id:[this.task.id],
        title: [this.task.title, Validators.required],
        description: [this.task.description, [Validators.required]],
        deadline: [this.task.deadline, Validators.required],
        statusId: [this.task.statusId, Validators.required],
        users: [this.task.users.map(x=>x.id)]
      });
    }
  }

  operateTask() {
    if (this.newTaskForm.invalid) {
      return;
    }
    this.errorMessages=null;
    this.accountService.operateTask(this.newTaskForm.value,this.task?false:true).subscribe(res => {
      if(res.code==0){
        this.dialogRef.close();
        this.dashboardService.showMessage(this.task?"Task edited":"Task added",'','bg-success',2000);
      }
      else{
        this.errorMessages=res.errors;
        this.dashboardService.showMessage(this.errorMessages.toString(),'',"bg-danger");
      }
    })
  }

  getStatuses(){
    this.dashboardService.getStatusList().subscribe(
      res=>{
        this.statuses=res.data;
      }
    );
  }
  getUsers(){
    this.dashboardService.getUserList().subscribe(
      res=>{
        this.usersList=res.data;
      }
    );
  }

  get title() { return this.newTaskForm.get("title") };
  get description() { return this.newTaskForm.get("description") };
  get deadline() { return this.newTaskForm.get("deadline") };
  get statusId() { return this.newTaskForm.get("statusId") };
  get users() { return this.newTaskForm.get("users") };



}
