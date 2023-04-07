import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuizResultComponent } from './quiz/quiz-result/quiz-result.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {
    path:'',
    component:AppComponent
  },
  {
    path:'result',
    component:QuizResultComponent
  },
  {
    path:'quiz',
    component:QuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
