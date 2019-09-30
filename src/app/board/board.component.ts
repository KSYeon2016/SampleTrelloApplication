import { Component, OnInit, ElementRef } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { TrelloService } from 'app/services/trello.service';
import { Board } from 'app/model/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board = new Board;

  editingTitle = false;
  currentTitle: string;

  // 라우터 서비스 주입, 트렐로 서비스 참조
  constructor(public el: ElementRef, private _route: ActivatedRoute, private _trelloService: TrelloService) { }

  // 데이터 초기화
  ngOnInit() {
    let boardId = this._route.snapshot.params['id'];
    console.log(boardId);
    this.board = this._trelloService.Boards.find(x => x.id == boardId);
  }

  addSubTask(event) {
    console.log("이벤트 발생");
    console.log(event);
  }

  editTitle() {
    this.currentTitle = this.board.title;
    this.editingTitle = true;

    const input = this.el.nativeElement
      .getElementsByClassName('board-title')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {       // enter
      event.target.blur();
    }
    else if (event.keyCode === 27) {  // esc
      this.board.title = this.currentTitle;
      this.editingTitle = false;
    }
  }

  updateBoard() {
    this.editingTitle = false;
    document.title = this.board.title + ' | Generic Task Manager';
    this._trelloService.Boards.find(x => x.id == this.board.id).title = this.board.title;
  }

}
