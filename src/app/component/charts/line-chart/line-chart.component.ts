import { Router } from '@angular/router';
import { PlantOilService } from './../../../service/plantOil.service';
import { PlantOilAcidService } from './../../../service/plantOilAcid.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js'
import { PlantOilAcid } from 'src/app/interface/tableInterface/plantOilAcid';
import { PlantOil } from 'src/app/interface/tableInterface/plantOil';
import { Oil } from 'src/app/interface/tableInterface/oil';
import { OilAcid } from 'src/app/interface/tableInterface/oilAcid';
import { OilService } from 'src/app/service/oil.service';
import { OilAcidService } from 'src/app/service/oilAcid.service';
import { AcidService } from 'src/app/service/acid.service';
import { Acid } from 'src/app/interface/tableInterface/acid';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  minValue: any;
  maxValue: any;
  currentValue:any;
  chartArray: any[]=[];

  value:any;

  public Oils: Oil[] = [];
  public OilAcids: OilAcid[] = [];

  acidName: any;
  acidID: any;

  select:any;
  chart: any = [];
  dataSource: any;
  forValue:any;
  constructor(private service: PlantOilAcidService, private oilService: OilService, private oilAcidService: OilAcidService, private acidService: AcidService, private router:Router) {
  }

  ngOnInit() {
    this.getPlantValue();
    this.getOil();
  }
  public getOil(): void {
    this.oilService.getOil().subscribe({
      next: (response: Oil[]) => {
        this.Oils = response;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 401){
          confirm('Вы не авторизовались и будете перенаправлены на страницу авторизации')
          this.router.navigate(['/login']);
        }
        else{
        alert(error.message);
        }
      },
    })
  }
  public getPlantValue(): void {
    this.oilAcidService.getOilAcid().subscribe({
      next: (oilValue: OilAcid[],) => {
        this.OilAcids = oilValue;
      }
    })

      this.acidService.getAcid().subscribe({
        next: (acidData: Acid[]) => {
          this.forValue = acidData;
          this.acidName = this.forValue.map((data: any) => data.acid_name);
        }
      })

    this.service.getPlantOilAcid().subscribe({
      next: (response: PlantOilAcid[]) => {
      this.dataSource = response;
      this.makeChart();
      }
    })
  }
  makeChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.acidName,
        datasets: [
          {
            data: [],
            label: 'Минимальное значение',
            borderColor: 'green',
            backgroundColor:'#4aeb2a',
            pointRadius:7,
            pointBackgroundColor:'#4aeb2a'
          },
          {
            data: [],
            label: 'Максимальное значение',
            fill: true,
            borderColor: 'red',
            backgroundColor:'#fc6d6d',
            pointRadius:7,
            pointBackgroundColor:'#fc6d6d'
          },
          {
            data: [],
            label: 'Точное значение',
            fill: true,
            borderColor: 'gold',
            backgroundColor:'rgba(255,215,0,0.2)',
            pointRadius:7,
            pointBackgroundColor:'#f3f707'
          },
        ],
      },
    });
  }


  onChange() {
    this.select = document.getElementById("id_plants");
    this.value = this.select.value;

    //фильтрация
    var dataFilter = this.dataSource.filter((dataSource:any) =>
    {
      return dataSource.name_oils==this.value;
    })

    var oilFilter = this.OilAcids.filter((OilAcids:any) =>
    {
      return OilAcids.oils_sort==this.value;
    })


    this.minValue = dataFilter.map((data: any) => data.fat_acid_content_min);
    this.maxValue = dataFilter.map((data: any) => data.fat_acid_content_max);
    //сортировка значений

    dataFilter.sort(function(x:any,y:any)
    {
      return x.name_acids.localeCompare(y.name_acids)
    })
    dataFilter.sort(function(x:any,y:any)
    {
      return x.name_acids.length-y.name_acids.length
    })
    this.minValue = dataFilter.map((data: any) => data.fat_acid_content_min);
    this.maxValue = dataFilter.map((data: any) => data.fat_acid_content_max);
    oilFilter.sort(function(x:any,y:any)
    {
      return x.name_acids.localeCompare(y.name_acids)
    })
    oilFilter.sort(function(x:any,y:any)
    {
      return x.name_acids.length-y.name_acids.length
    })
    this.currentValue = oilFilter.map((data: any) => data.acid_value);
    this.acidName = oilFilter.map((data:any)=> data.name_acids)
    /*
    var dataFilter = this.dataSource.filter((dataSource:any) =>
    {
      return dataSource.name_oils==this.value;
    })
    this.minValue = dataFilter.map((data: any) => data.fat_acid_content_min);
    this.maxValue = dataFilter.map((data: any) => data.fat_acid_content_max);
    this.acidName = dataFilter.map((data: any) => data.name_acids);
    this.currentValue = this.OilAcids.map((data: any) => data.acid_value);
    var oilFilter = this.OilAcids.filter((OilAcids:any) =>
    {
      return OilAcids.oils_sort==this.value;
    })
    console.log(oilFilter)

    this.currentValue = oilFilter.map((data: any) => data.acid_value);
*/
    this.chart.destroy();
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.acidName,
        datasets: [
          {
            data: this.minValue,
            label: 'Минимальное значение',
            borderColor: 'green',
            backgroundColor:'#4aeb2a',
            pointRadius:7,
            pointBackgroundColor:'#4aeb2a'
          },

          {
            data: this.maxValue,
            label: 'Максимальное значение',
            borderColor: 'red',
            backgroundColor:'#fc6d6d',
            pointRadius:7,
            pointBackgroundColor:'#fc6d6d'

          },

          {
            data: this.currentValue,
            label: 'Точное значение',
            borderColor: 'gold',
            backgroundColor:'rgba(255,215,0,0.2)',
            pointRadius:7,
            pointBackgroundColor:'#f3f707'

          },
        ],
      },
  }
  );
  console.log(dataFilter);
  console.log(oilFilter)
  }


}

