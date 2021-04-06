import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from 'src/app/service/class/class.service';
import { Class } from 'src/app/models/class';
import { DepartmentService } from 'src/app/service/department/department.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addForm: FormGroup
  message: string
  departments: any[] = []
  loading = false
  submitted = false
  class: Class
  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private classService: ClassService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  get data() { return this.addForm.controls; }

  load() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      departmentId: ['', Validators.required],
    })
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.get().subscribe(
      (resp: any) => {
        resp.forEach((items: any) => {
          this.departments.push(items.id);
        });

      })
  }
  insert() {
    this.submitted = true;
    this.class = {
      name: this.data.name.value,
      departmentId: this.data.departmentId.value
    }
    this.classService.add(this.class)
      .subscribe(resp => {
        this.addForm.reset();
        this.submitted = false;
        this.message = 'Added Successfully';
      },
        error => this.message = error)
  }

  setDepartmentId() {
    console.log(this.data.departmentId.value);
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }

}
