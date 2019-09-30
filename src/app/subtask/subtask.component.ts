import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { SubTask } from 'app/model/subtask';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.css']
})
export class SubtaskComponent implements OnInit {
  @Input()
  subTask: SubTask;

  editingsubTask = false;
  currentTitle: string;

  constructor(private el: ElementRef) { }

  ngOnInit() { }

  updatesubTask() {
    if (!this.subTask.title || this.subTask.title.trim() === '') {
      this.subTask.title = this.currentTitle;
    }

    this.editingsubTask = false;
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    } else if (event.keyCode === 27) {
      this.subTask.title = this.currentTitle;
      this.editingsubTask = false;
    }
  }

  editsubTask() {
    this.editingsubTask = true;
    this.currentTitle = this.subTask.title;

    let textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];

    setTimeout(function() {
      textArea.focus();
    }, 0);
  }

}
