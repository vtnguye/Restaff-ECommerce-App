import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassService } from 'src/app/service/class/class.service';
import { DepartmentService } from 'src/app/service/department/department.service';
import { StudentService } from 'src/app/service/student/student.service';
import { AddComponent as DepartmentAddComponent } from '../department/add/add.component';
import { AddComponent as ClassAddComponent } from '../class/add/add.component';
import { AddComponent as StudentAddComponent } from '../student/add/add.component';
import { EditComponent as DepartmentEditComponent } from '../department/edit/edit.component';
import { EditComponent as ClassEditComponent } from '../class/edit/edit.component';
import { EditComponent as StudentEditComponent } from '../student/edit/edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  services = new Map()
  addComponents = new Map()
  editComponents = new Map()
  title = "DEPARTMENT"


  pagination: any
  pageNumber: number = 1
  pageSize: any
  totalPage!: number[];
  data: any
  closeResult = ''
  constructor(
    private http: HttpClient,
    private departmentService: DepartmentService,
    private modalService: NgbModal,
    private classService: ClassService,
    private studentService: StudentService
  ) {

  }

  ngOnInit(): void {
    this.load();

  }

  load() {
    this.services
      .set("DEPARTMENT", this.departmentService)
      .set("CLASS", this.classService)
      .set("STUDENT", this.studentService);

    this.addComponents
      .set("DEPARTMENT", DepartmentAddComponent)
      .set("CLASS", ClassAddComponent)
      .set("STUDENT", StudentAddComponent)
    this.editComponents
      .set("DEPARTMENT", DepartmentEditComponent)
      .set("CLASS", ClassEditComponent)
      .set("STUDENT", StudentEditComponent)


    this.pagination = { pageNumber: this.pageNumber };
    this.paging(1);
  }
  delete(id: any) {
    this.services.get(this.title).delete(id).subscribe(() =>
      window.location.reload());
  }

  paging(index: number) {
    this.totalPage = [];
    this.pagination = {
      params: { pageNumber: index }
    };
    this.services.get(this.title).paging(this.pagination)
      .subscribe((resp: any) => {
        this.data = resp.data;
        var i;
        for (i = 1; i <= resp.totalPage; i++) {
          this.totalPage.push(i);
        }
      }, (error: any) => console.log(error)
      )
  }


  openAdd() {
    var modalRef = this.modalService.open(this.addComponents.get(this.title), { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }
  openEdit(item: any) {
    var modalRef = this.modalService.open(this.editComponents.get(this.title), { ariaLabelledBy: 'modal-basic-title' });

    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }
  //ROUTING
  setDepartment() {
    this.title = "DEPARTMENT";
    this.paging(1);
  }
  setClass() {
    this.title = "CLASS";
    this.paging(1);
  }
  setStudent() {
    this.title = "STUDENT";
    this.paging(1);
  }

}

