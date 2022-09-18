import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { BarComponent } from './component/charts/bar/bar.component';
import { NgChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import {MatSelectModule} from '@angular/material/select';
import { LineChartComponent } from './component/charts/line-chart/line-chart.component';
import { RadarChartComponent } from './component/charts/radar-chart/radar-chart.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginComponent } from './component/login/login.component';
import { HttpInterceptorService } from './component/login/httpInterceptor.service';
import { NavbarComponent } from './component/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AcidTableComponent,
    OilAcidTableComponent,
    OilTableComponent,
    PlantOilTableComponent,
    PlantOilAcidTableComponent,
    BarComponent,
    LineChartComponent,
    RadarChartComponent,
    LoginComponent,
    NavbarComponent,

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
    NgChartsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [ {
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorIntl},
    {provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true},
    ]
    ,
  bootstrap: [AppComponent]
})
export class AppModule { }
