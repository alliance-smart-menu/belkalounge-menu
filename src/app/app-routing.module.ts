import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';

import { MenuPageComponent } from './menu-page/menu-page.component';
import { TablePageComponent } from './table-page/table-page.component';

const routes: Routes = [

  {path: '',  component: MainPageComponent},

  {path: 'menu',  component: MenuPageComponent},
  {path: 'table',  component: TablePageComponent},

  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
