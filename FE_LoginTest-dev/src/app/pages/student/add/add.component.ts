import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from 'src/app/service/student/student.service';
import { Student } from 'src/app/models/student';
import { ClassService } from 'src/app/service/class/class.service';

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
  classes: any[] =[]
  student: Student
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngbActiveModal: NgbActiveModal,
    private studentService: StudentService,
    private classSerive:ClassService
  ) { }

  ngOnInit(): void {
    this.load();
  }
  load(){
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      classId: ['', Validators.required],
    })
    this.loadClasses();
  }

  loadClasses(){
    this.classSerive.get().subscribe(
      (resp:any)=>
      resp.forEach((items:any) =>{
        this.classes.push(items.id);
      }
      )
    )
  }

  get data() { return this.addForm.controls; }
  insert() {
    this.submitted = true;
    this.student = {
      name: this.data.name.value,
      classId:this.data.classId.value
    }
    this.studentService.add(this.student)
      .subscribe(resp => {
        this.addForm.reset();
        this.submitted=false;
        this.message = 'Added Successfully'
      },
        error => this.message=error)
  }

  setClassId(){
    console.log(this.data.classId.value);
  }
  close(event : any) {
    this.ngbActiveModal.close();
  }

}
