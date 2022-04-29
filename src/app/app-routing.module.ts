import { TableComponent } from './component/table/table.component';
import { AppComponent } from './../../../dipApp/src/app/app.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'table', component:TableComponent},
  {path: 'home', component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
