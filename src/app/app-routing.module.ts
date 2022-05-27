import { ChartsComponent } from './component/charts/charts.component';
import { PlantOilAcidTableComponent } from './component/table/plantOilAcidTable/plantOilAcidTable.component';
import { PlantOilTableComponent } from './component/table/plantOilTable/plantOilTable.component';
import { OilAcidTableComponent } from './component/table/oilAcidTable/oilAcidTable.component';
import { AcidTableComponent } from './component/table/acidTable/acidTable.component';
import { AppComponent } from './../../../dipApp/src/app/app.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { OilTableComponent } from './component/table/oilTable/oilTable.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'table/acid', component:AcidTableComponent},
  {path: 'table/oilAcid', component:OilAcidTableComponent},
  {path: 'table/oil', component:OilTableComponent},
  {path: 'table/plantOil', component:PlantOilTableComponent},
  {path: 'table/plantOilAcid', component:PlantOilAcidTableComponent},
  {path: 'charts', component:ChartsComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload',} ),
  TranslateModule.forRoot()
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
