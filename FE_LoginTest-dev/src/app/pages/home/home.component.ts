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
import { SearchComponent } from '../student/search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  services = new Map()
  addComponents = new Map()
  editComponents = new Map()
  title: string
  message: string
  alertMessage: boolean

  pagination: any
  pageNumber: number = 1
  pageSize: any
  totalPage!: number[];
  data: any
  closeResult = ''
  constructor(
    private departmentService: DepartmentService,
    private modalService: NgbModal,
    private classService: ClassService,
    private studentService: StudentService
  ) {

  }

  ngOnInit(): void {
    this.load("DEPARTMENT");

  }

  load(title: string) {
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
    this.alertMessage = false;
    this.title = title;
    this.message = "";
    this.pagination = { pageNumber: this.pageNumber };
    this.paging(1, true);
  }
  delete(id: any) {
    if (confirm("Are u sure?")) {
      this.services.get(this.title).delete(id).subscribe((resp: boolean) => {
        if (resp || this.title == "STUDENT") {
          this.message = "DELETE SUCCESSFULLY";
          this.paging(1, false);
        }
        if (!resp) {
          this.message = "Cannot DELETE this " + this.title;
        }
        this.alertMessage = true;
      });
    }
  }

  closeAlert(){
    this.alertMessage=false;
  }

  paging(index: number, change: boolean) {
    if (change) {
      this.totalPage = [];
      this.alertMessage = false;
    }

    this.pagination = {
      params: { pageNumber: index }
    };
    this.services.get(this.title).paging(this.pagination)
      .subscribe((resp: any) => {
        this.data = resp.data;
        var i;
        if (change) {
          for (i = 1; i <= resp.totalPage; i++) {
            this.totalPage.push(i);
          }
        }
      }, (error: any) => console.log(error)
      )
  }


  openAdd() {
    var modalRef = this.modalService.open(this.addComponents.get(this.title), { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result.then(() => {
      this.paging(1, false);
    }
    );
  }
  openEdit(item: any) {
    var modalRef = this.modalService.open(this.editComponents.get(this.title), { ariaLabelledBy: 'modal-basic-title' });

    modalRef.componentInstance.item = item;
    modalRef.result.then(() => {
      this.paging(1, false);
    });
  }

  openSearch(){
    var modalRef = this.modalService.open(SearchComponent, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result.then(() => {
      this.paging(1, false);
    });
  }
  //ROUTING
  setDepartment() {
    this.title = "DEPARTMENT";
    this.paging(1, true);
  }
  setClass() {
    this.title = "CLASS";
    this.paging(1, true);
  }
  setStudent() {
    this.title = "STUDENT";
    this.paging(1, true);
  }

}

