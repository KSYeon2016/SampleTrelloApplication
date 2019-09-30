import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private _route: ActivatedRoute, private _boardService: TrelloService) { }

  ngOnInit() {
  }

}
