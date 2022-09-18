import { Router } from '@angular/router';
import { AcidService } from './../../../service/acid.service';
import { OilAcidService } from './../../../service/oilAcid.service';
import { OilService } from './../../../service/oil.service';
import { PlantOilService } from './../../../service/plantOil.service';
import { PlantOilAcidService } from './../../../service/plantOilAcid.service';
import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js'
import { PlantOilAcid } from 'src/app/interface/tableInterface/plantOilAcid';
import { Oil } from 'src/app/interface/tableInterface/oil';
import { OilAcid } from 'src/app/interface/tableInterface/oilAcid';
import { Acid } from 'src/app/interface/tableInterface/acid';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {

  minValue: any;
  maxValue: any;
  currentValue:any;
  public : any[]=[];
  chartArray: any[]=[];
  public Oils: Oil[] = [];
  public OilAcids: OilAcid[] = [];
  acidName: any;
  acidID: any;
  counter:any;
  chartData:any=[];

  select:any;

  value:any;

  chart: any = [];
  dataSource: any;
  forValue:any;
  constructor(private service: PlantOilAcidService, private oilService: OilService, private oilAcidService: OilAcidService, private acidService: AcidService, private router: Router) {
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
      next: (oilValue: OilAcid[]) => {
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
      type: 'radar',
      data: {
        labels: this.acidName,
        datasets: [
          {
            data: [],
            label: 'Минимальное значение',
            fill: true,
          },
          {
            data: [],
            label: 'Максимальное значение',
            fill: true,
          },
          {
            data: [],
            label: 'Точное значение',
            fill: true,
            backgroundColor: 'rgba(34, 224, 59, 0.2)',
            borderColor: 'rgb(34, 224, 59)',
            pointBackgroundColor: 'rgb(34, 224, 59)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(34, 224, 59)'
          },
        ],
      },
    });
  }

  compareNumbers(a:any, b:any) {
    return a + b;
  }

  onChange() {
    for(let i=0; i<this.acidName.length; i++)
    {
      this.chartArray[i] = 0;
    }
    this.counter=0;
    this.select = document.getElementById("id_oils");
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
    var maxValuePos: any=[];
    //анализ
    for(let i=0; i<this.currentValue.length; i++)
    {
    maxValuePos[i]=+this.maxValue[i]
    this.minValue[i]=(this.minValue[i]-this.minValue[i]/100*5).toFixed(2);
    maxValuePos[i]=(maxValuePos[i]+maxValuePos[i]/100*5).toFixed(2);
      if(this.currentValue[i]>=this.minValue[i] && this.currentValue[i] <= maxValuePos[i])
      {
      this.counter++
      }

    }
    this.counter = this.counter/this.currentValue.length;
    this.chart.destroy();
    this.chart = new Chart('canvas', {
      type: 'radar',
      options: {

      },
      data: {
        labels: this.acidName,
        datasets: [
          {
            data: this.minValue,
            label: 'Минимальное значение',
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
            pointRadius:5
          },

          {
            data: maxValuePos,
            label: 'Максимальное значение',
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)',
            pointRadius:5

          },

          {
            data: this.currentValue,
            label: 'Точное значение',
            fill: true,
            backgroundColor: 'rgba(34, 224, 59, 0.2)',
            borderColor: 'rgb(34, 224, 59)',
            pointBackgroundColor: 'rgb(34, 224, 59)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(34, 224, 59)',
            pointRadius:7,
          },
        ],
      },
  }
  );
  for(let i=0; i<this.acidName.length; i++)
  {
    this.chartArray[i] = { acidName:this.acidName[i], currentValue:this.currentValue[i], minValue: this.minValue[i], maxValue: maxValuePos[i]}
  }
}
}


