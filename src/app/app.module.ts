
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AcidTableComponent } from './component/table/acidTable/acidTable.component';
import { OilAcidTableComponent } from './component/table/oilAcidTable/oilAcidTable.component';
import { OilTableComponent } from './component/table/oilTable/oilTable.component';
import { PlantOilAcidTableComponent } from './component/table/plantOilAcidTable/plantOilAcidTable.component';
import { PlantOilTableComponent } from './component/table/plantOilTable/plantOilTable.component';
import { CustomMatPaginatorIntl } from './component/table/CustomMatPaginatorIntl';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { ChartsComponent } from './component/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AcidTableComponent,
    OilAcidTableComponent,
    OilTableComponent,
    PlantOilTableComponent,
    PlantOilAcidTableComponent,
    ChartsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    NgxChartsModule
  ],
  providers: [ {
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorIntl},]
    ,
  bootstrap: [AppComponent]
})
export class AppModule { }
