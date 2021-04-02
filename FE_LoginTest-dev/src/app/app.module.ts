import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';

import { enableProdMode } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { AddComponent as DepartmentAddComponent } from './pages/department/add/add.component';
import { AddComponent as ClassAddComponent } from './pages/class/add/add.component';
import { AddComponent as StudentAddComponent } from './pages/student/add/add.component';
import { BaseService } from './service/base.service';
import { DepartmentService } from './service/department/department.service';
import { EditComponent as DepartmentEditComponent } from './pages/department/edit/edit.component';
import { EditComponent as ClassEditComponent } from './pages/class/edit/edit.component';
import { EditComponent as StudentEditComponent } from './pages/student/edit/edit.component';

registerLocaleData(en);
enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DepartmentAddComponent,
    StudentAddComponent,
    ClassAddComponent,
    DepartmentEditComponent,
    ClassEditComponent,
    StudentEditComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzInputModule,
    CommonModule,
    NzPaginationModule,
    NzListModule,
    NzCardModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [BaseService,
    DepartmentService],
  bootstrap: [AppComponent],
})
export class AppModule { }
