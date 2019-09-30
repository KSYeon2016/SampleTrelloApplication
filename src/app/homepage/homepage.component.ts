import { Component, OnInit } from '@angular/core';
import { Board } from 'app/model/board';
import { TrelloService } from 'app/services/trello.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
// OnInit: 컴포넌트를 초기화하고 데이터 바인딩된 프로퍼티를 표시
export class HomepageComponent implements OnInit {  
  boards: Board[] = Array();
  errorMessage: string;

  constructor(private _trelloService: TrelloService) { }

  ngOnInit() {
    this.boards.push(this._trelloService.seedData());
  }

  public addBoard() {
    console.log('Adding new board');
    
    let newBoard: Board = new Board;
    newBoard.id = this.boards.length + 1;
    newBoard.task = Array();
    newBoard.title = "New Board";
    this.boards.push(newBoard);
    
    console.log('new board added');
  }
}
