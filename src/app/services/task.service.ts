import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  TaskItems: Task[];
  constructor(private http: HttpClient) { }
  saveOrUpdateTask(task) {
    return this.http.post(environment.apiURL, task);
  }

  getTaskList() {
    this.http.get(environment.apiURL).toPromise().then(res=>{
      this.TaskItems=res as Task[];
    });
    
  }

  getTaskByID(id:number):any {
    return this.http.get(environment.apiURL+id).toPromise();
  }

  deleteTask(id:number) {
    return this.http.delete(environment.apiURL+id).toPromise();
  }
  putTask(id, task) {
    return this.http.put(environment.apiURL+id,task).toPromise();
  }
}
