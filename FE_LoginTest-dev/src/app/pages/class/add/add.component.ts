import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from 'src/app/service/class/class.service';
import { Class } from 'src/app/models/class';

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
  class: Class
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngbActiveModal: NgbActiveModal,
    private classService: ClassService
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }

  get data() { return this.addForm.controls; }
  insert() {
    this.submitted = true;
    this.class = {
      name: this.data.name.value
    }
    this.classService.add(this.class)
      .subscribe(resp => {
        this.addForm.reset();
        this.submitted=false;
        this.message = 'Added Successfully';
      },
        error => this.message=error)
  }
  close(event : any) {
    console.log(event);
    this.ngbActiveModal.close();
    this.reload();
  }

}
