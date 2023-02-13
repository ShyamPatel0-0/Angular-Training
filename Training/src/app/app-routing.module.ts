import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../../../Training/src/app/about/about.component';
import { HomeComponent } from '../../../Training/src/app/home/home.component';
import { UserComponent } from '../../../Training/src/app/user/user.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user/:id',
    component: UserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
