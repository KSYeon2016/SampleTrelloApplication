import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Task } from 'app/model/task';
import { SubTask } from 'app/model/subtask';
import { ActivatedRoute } from '@angular/router';
import { TrelloService } from 'app/services/trello.service';
import { Board } from 'app/model/board';

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

  boards: Board[];
  board: Board = new Board;
  addSubTaskText: string;
  editingtask = false;
  currentTitle: string;

  constructor(private el: ElementRef, private _route: ActivatedRoute, private _boardService: TrelloService) { 
    this.onAddSubTask = new EventEmitter();
  }

  ngOnInit() {
    const boardId = this._route.snapshot.params['id'];
    if (boardId != undefined) {
      this.boards = this._boardService.Boards;
      console.log(this.boards);
      for (const v of this.boards) {
        if (v.id == boardId) {
          this.board = v;
          break;
        }
      }
    };
  }

  clearAddsubTask() {
    this.addSubTaskText = '';
  }

  updatetaskOnBlur() {
    if (this.editingtask) {
      this.updatetask();
      this.clearAddsubTask();
    }
  }

  cleadAddtask() {
    this.task.title = this.currentTitle;
    this.editingtask = false;
  }

  updatetask() {
    if (this.task.title && this.task.title.trim() !== '') {
      this.editingtask = false;
    } else {
      this.cleadAddtask();
    }
  }

  addtaskOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.updatetask();
    } else if (event.keyCode === 27) {
      this.cleadAddtask();
    }
  }

  edittask() {
    this.currentTitle = this.task.title;
    this.editingtask = true;
    const input = this.el.nativeElement
      .getElementsByClassName('task-header')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }
}
