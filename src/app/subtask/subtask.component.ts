import { Component, OnInit, Input } from '@angular/core';
import { SubTask } from 'app/model/subtask';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.css']
})
export class SubtaskComponent implements OnInit {
  @Input()
  subTask: SubTask;

  constructor() { }

  ngOnInit() {
  }

}
