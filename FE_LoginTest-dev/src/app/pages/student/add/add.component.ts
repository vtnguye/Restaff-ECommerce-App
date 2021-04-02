import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from 'src/app/service/student/student.service';
import { Student } from 'src/app/models/student';

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
  student: Student
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngbActiveModal: NgbActiveModal,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],

    })
  }

  get data() { return this.addForm.controls; }
  insert() {
    this.submitted = true;
    this.student = {
      name: this.data.name.value
    }
    this.studentService.add(this.student)
      .subscribe(resp => {
        this.addForm.reset();
        this.submitted=false;
        this.message = 'Added Successfully'
      },
        error => this.message=error)
  }
  close(event : any) {
    console.log(event);
    this.ngbActiveModal.close();
    this.reload();
  }

}
