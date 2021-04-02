import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  Url: string
  constructor(private baseService: BaseService) {
    this.Url = 'https://localhost:44309/api/student'
  }
  paging(model: any) {
    return this.baseService.get(this.Url, model);
  }

  add(model: any) {
    return this.baseService.post(this.Url + "/insert", model);
  }
  delete(id: any) {
    return this.baseService.deleteWithId(this.Url, id)
  }
  update(model: any) {
    return this.baseService.put(this.Url, model);
  }
}
