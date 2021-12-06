import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellModule } from '../shell/shell.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material/material.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    HttpClientModule,
    MaterialModule,
  ]
})
export class HomeModule { }
