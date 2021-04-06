import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from 'src/app/service/student/student.service';
import { Student } from 'src/app/models/student';
import { ClassService } from 'src/app/service/class/class.service';

@Component({
  selector: 'app-add',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup
  options = "ID"
  message: string
  loading = false
  submitted = false
  found: boolean = false
  student: Student
  results : any[] = []
  result:any
  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private studentService: StudentService,
  ) { }

  ngOnInit(): void {
    this.load();
  }
  load() {
    if (this.options == "NAME") {
      this.searchForm = this.formBuilder.group({
        name: ['', Validators.required],
      })
    }
    if (this.options == "ID") {
      this.searchForm = this.formBuilder.group({
        studentId: ['', Validators.required],
      })
    }
    this.found=false;
  }


  get data() { return this.searchForm.controls; }
  search() {

    this.submitted = true;
    //SEARCH BY ID
    if (this.options == "ID") {
      this.studentService.getById(this.data.studentId.value)
        .subscribe((resp:any) => {
          if (resp != null) {
            this.found=true;
            this.searchForm.reset();
            this.submitted = false;
            this.result = resp;
          }

        },
          error => this.message = error)
    }
    //SEARCH BY NAME
    if (this.options == "NAME") {
      console.log(this.data.name.value);
      this.studentService.getByName(this.data.name.value)
        .subscribe((resp:any) => {
          if (resp != null) {
            this.found=true;
            this.searchForm.reset();
            this.submitted = false;
            this.results = resp;
            
          }

        },
          error => this.message = error)
    }
  }

  setId() {
    this.options = "ID";
    this.ngOnInit();
  }
  setName() {
    this.options = "NAME";
    this.ngOnInit();
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }

}
