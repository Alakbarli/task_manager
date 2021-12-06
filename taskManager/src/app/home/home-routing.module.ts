import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShellService } from '../shell/shell.service';
import { LoginComponent } from './login/login.component';
import { DashboardService } from '../dashboard/dashboard.service';
import { TaskComponent } from '../dashboard/components/task/task.component';
import { UserComponent } from '../dashboard/components/user/user.component';
import { AuthGuardGuard } from '../guards/auth-guard.guard';
import { NewUserComponent } from '../dashboard/fixed-parts/dialogs/new-user/new-user.component';
import { NewTaskComponent } from '../dashboard/fixed-parts/dialogs/new-task/new-task.component';

const routes: Routes = [
  ShellService.childRoutes([
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
      path: 'login',
      component: LoginComponent
    },
  ]),

  DashboardService.childRoutes([
    { path: '', redirectTo: '/task', pathMatch: 'full' },
    {
      path: 'task',
      component: TaskComponent,
        canActivate: [AuthGuardGuard],
    },
    {
      path: 'user',
      component: UserComponent,
        canActivate: [AuthGuardGuard],
    }

  ])
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
 // providers: [HomeService]
})
export class HomeRoutingModule { }
