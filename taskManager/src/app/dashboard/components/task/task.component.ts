import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from '../../dashboard.service';
import { ConfirmDialogComponent } from '../../fixed-parts/dialogs/confirm-dialog/confirm-dialog.component';
import { NewTaskComponent } from '../../fixed-parts/dialogs/new-task/new-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  errorMessages:Array<string>;
  taskList:Array<Task>;
  dateNow=new Date();
  constructor(private dashboardService:DashboardService,
    private accountService:AccountService,
    private router:Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['name', 'description', 'users','deadline','status','operation'];
  dataSource = new MatTableDataSource<Task>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getTasks();
  }
  isDue(d:string):boolean{
    return new Date()>new Date(d);
  }
  getTasks(){
    this.dashboardService.getTaskList().subscribe(
      data=>{
        this.taskList=data.data;
        this.dataSource.data = data.data;
        this.dataSource.paginator = this.paginator;
      },
      err=>{

      }
    )
  }
  new(){
    let dialogRef = this.dialog.open(NewTaskComponent, {
      disableClose: true,
      width: '350px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }
  edit(id:number){
    let dialogRef = this.dialog.open(NewTaskComponent, {
      disableClose: true,
      width: '350px',
      data: this.taskList.find(x=>x.id==id)
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }
  delete(id:any){
    let task=this.taskList.find(x=>x.id==id);
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '350px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
          this.errorMessages=null;
          this.accountService.deleteTask(id).subscribe(res => {
            if(res.code==0){
              this.dashboardService.showMessage("User deleted",'','bg-success',2000);
              this.getTasks();
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
