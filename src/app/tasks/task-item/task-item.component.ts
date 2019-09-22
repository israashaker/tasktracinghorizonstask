import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  formData: Task={
    taskId:0,
    taskTitle: '',
    taskDetails:'',
    assingeeName: '',
    project:'',
    date:null
  };
  constructor(private service: TaskService,
    private toastr: ToastrService
    ) { }
  ngOnInit() {
    this.resetForm();
    this.service.getTaskList();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
  }
   onSubmit(form: NgForm) {
     if(this.formData.taskId != 0){
      this.service.putTask(this.formData.taskId,this.formData).then(res=>{
        this.resetForm(form);
        this.service.getTaskList();
        this.toastr.success("Updated Successfully",'Task Tracing App.');
      })
    
     }else{
      this.service.saveOrUpdateTask(form.value)
     .subscribe((res)=> {
       this.resetForm(form);
       this.service.getTaskList();
         this.toastr.success('Submitted Successfully', 'Task Tracing App.');
        })
     
  }}
  showForEdit(task: Task) {
    this.formData = Object.assign({}, task);
  }
 
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.service.deleteTask(id)
      .then(x => {
        this.service.getTaskList();
        this.toastr.warning("Deleted Successfully",'Task Tracing App.');
      })
    }
  }
}
