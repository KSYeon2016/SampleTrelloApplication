import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TrelloService } from './services/trello.service';
import { BoardComponent } from './board/board.component';
import { TaskComponent } from './task/task.component';
import { SubtaskComponent } from './subtask/subtask.component';

const appRoutes: Routes = [
  {path: 'board/:id', component: BoardComponent, pathMatch: 'full'},
  {path: '', component: HomepageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BoardComponent,
    TaskComponent,
    SubtaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TrelloService],
  bootstrap: [AppComponent]
})
export class AppModule { }
