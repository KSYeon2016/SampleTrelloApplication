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
  public onAddsubTask: EventEmitter<SubTask>;

  boards: Board[];
  board: Board = new Board;
  addsubTaskText: string;
  editingtask = false;
  currentTitle: string;

  constructor(private el: ElementRef, private _route: ActivatedRoute, private _boardService: TrelloService) { 
    this.onAddsubTask = new EventEmitter();
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

  ////////// subtask 추가
  addsubTaskOnBlur() {
    if (this.addsubTaskText && this.addsubTaskText.trim() !== '') {
      this.addsubTask();
    }
    this.clearAddsubTask();
  }
  
  addsubTask() {  // subtask 배열이 없으면 생성 후 추가
    this.subTasks = this.subTasks || [];
    const newsubTask = <SubTask>{
      title: this.addsubTaskText
    };
    let selectedtask: Task;
    for (const v of this.board.task) {
      if (v.id == this.task.id) {
        selectedtask = v;
        break;
      }
    }

    if (selectedtask.subtask == undefined) {
      selectedtask.subtask = new Array();
    }
    selectedtask.subtask.push(newsubTask);
    this.subTasks = selectedtask.subtask;
    this.onAddsubTask.emit(newsubTask);
  }

  addsubTaskOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addsubTaskText && this.addsubTaskText.trim() !== '') {
        this.addsubTask();
        this.addsubTaskText = '';
      } else {
        this.clearAddsubTask();
      }
    } else if (event.keyCode === 27) {
      this.clearAddsubTask();
    }
  }

  enableAddsubTask() {
    const input = this.el.nativeElement
      .getElementsByClassName('add-subTask')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  ////////// task 이름 변경
  clearAddsubTask() {
    this.addsubTaskText = '';
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
