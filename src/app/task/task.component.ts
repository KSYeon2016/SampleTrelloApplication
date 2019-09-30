import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'app/model/task';
import { SubTask } from 'app/model/subtask';
import { ActivatedRoute } from '@angular/router';
import { TrelloService } from 'app/services/trello.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input()
  task: Task;
  
  @Input()
  subTasks: SubTask[];

  @Output()
  public onAddSubTask: EventEmitter<SubTask>;

  addSubTaskText: string;

  constructor(private _route: ActivatedRoute, private _boardService: TrelloService) { 
    this.onAddSubTask = new EventEmitter();
  }

  ngOnInit() {
  }

  addSubTask() {
    this.subTasks = this.subTasks || [];
    const newSubTask = <SubTask>{
      title: this.addSubTaskText
    };
    this.onAddSubTask.emit(newSubTask);
  }

}
