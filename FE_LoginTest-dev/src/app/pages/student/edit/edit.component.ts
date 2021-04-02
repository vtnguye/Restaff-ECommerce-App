import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from 'src/app/service/department/department.service';
import { StudentService } from 'src/app/service/student/student.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  reload = () => window.location.reload();
  public item: any
  editForm: FormGroup
  message: string
  loading = false
  submitted = false
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngbActiveModal: NgbActiveModal,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.loadItem();
  }

  get data() { return this.editForm.controls; }

  loadItem() {
    this.editForm = this.formBuilder.group({
      name: [this.item.name, Validators.required],
    })
  }

  edit() {
    this.submitted = true;
    this.item = {
      name: this.data.name.value,
      id: this.item.id,
      classId: this.item.classId
    }
    this.studentService.update(this.item)
      .subscribe(resp => {
        this.editForm.reset();
        this.submitted = false;
        this.message = 'Updated Successfully';
        this.close(null);
      },
        error => this.message = error)
  }
  close(event: any) {
    console.log(event);
    this.ngbActiveModal.close();
    this.reload();
  }

}
