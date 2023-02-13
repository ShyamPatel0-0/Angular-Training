import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../../../Training/src/app/about/about.component';
import { HomeComponent } from '../../../Training/src/app/home/home.component';
import { UserComponent } from '../../../Training/src/app/user/user.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { NoPageComponent } from './no-page/no-page.component';

const routes: Routes = [
  {
    path: 'about',
    children:[
      {
        path:'company',
        component:AboutCompanyComponent,
      },
      {
        path:'me',
        component:AboutMeComponent,
      },
    ],
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
  {
    path: '**',
    component: NoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
