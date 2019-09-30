import { Component, OnInit } from '@angular/core';
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

  // 라우터 서비스 주입, 트렐로 서비스 참조
  constructor(private _route: ActivatedRoute, private _trelloService: TrelloService) { }

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

}
