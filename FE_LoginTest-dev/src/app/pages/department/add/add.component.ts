import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from 'src/app/service/department/department.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  reload=()=>window.location.reload();
  addForm: FormGroup
  message : string 
  loading = false
  submitted = false
  department: Department
  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],


    })
  }

  get data() { return this.addForm.controls; }
  insert() {
    this.submitted = true;
    this.department = {
      name: this.data.name.value
    }
    this.departmentService.add(this.department)
      .subscribe(resp => {
        this.addForm.reset();
        this.submitted=false;
        this.message = 'Added Successfully';
      },
        error => this.message=error)
  }
  close(event : any) {
    this.ngbActiveModal.close();
  }

}
