import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {ReactiveFormsModule} from '@angular/forms';
import { NewExpenseComponent } from './new-expense/new-expense.component';
import { HistoryComponent } from './history/history.component';
import { FriendsComponent } from './friends/friends.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    NewExpenseComponent,
    HistoryComponent,
    FriendsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
