import { Injectable } from "@angular/core";
import { Board } from "app/model/board";
import { Http } from "@angular/http";
import { Task } from "app/model/task";
import { SubTask } from "app/model/subtask";

@Injectable()
export class TrelloService {
    public Boards: Board[];

    constructor(private _http: Http) {}

    public seedData() {
        const tempTask: Task = new Task();
        const tempSubtask: SubTask = new SubTask();
        const board: Board = new Board();

        tempTask.id = 1;
        tempTask.title = "Hello 작업!!";
        tempTask.taskheaderId = '1';

        tempSubtask.id = '1';
        tempSubtask.title = "Hello 작업 헤더!!";

        tempTask.subtask = Array();
        tempTask.subtask.push(tempSubtask);

        board.id = 1;
        board.title = "Hello 보드";
        board.task = new Array();
        board.task.push(tempTask);

        this.Boards = new Array();
        this.Boards.push(board);

        return board;
    }
}