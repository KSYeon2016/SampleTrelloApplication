import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { TrelloService } from 'app/services/trello.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  // 라우터 서비스 주입, 트렐로 서비스 참조
  constructor(private _route: ActivatedRoute, private _trelloService: TrelloService) { }

  // 데이터 초기화
  ngOnInit() {
    let boardId = this._route.snapshot.params['id'];
  }

}
