import { Router } from '@angular/router';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { OilService } from 'src/app/service/oil.service';
import { OilAcid } from '../../../interface/tableInterface/oilAcid';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Chart} from 'node_modules/chart.js'
import { OilAcidService } from 'src/app/service/oilAcid.service';
import { Oil } from 'src/app/interface/tableInterface/oil';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-charts',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnDestroy {

  acidValue: any;
  acidName: any;
  select:any;
  value:any;
  chart: any = [];
  dataSource: any;
  public Oils: Oil[] = [];
  constructor(private service: OilAcidService, private oilService: OilService, private router:Router) {

  }
  ngOnInit() {
    this.getOilAcid();
    this.getOil();

  }
  ngOnDestroy() {
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
  public getOilAcid(): void {
    this.service.getOilAcid().subscribe({
      next: (response: OilAcid[]) => {
      this.dataSource = response;
      this.acidValue = this.dataSource.map((data: any) => data.acid_value);
      this.acidName = this.dataSource.map((data: any) => data.name_acids);
      this.makeChart();
      }
    })
  }
  makeChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      plugins: [ChartDataLabels],
      data: {
        labels: this.acidName,
        datasets: [
          {
            data: this.acidValue,
            borderColor: '#3e95cd',
            label: 'Значение',
            backgroundColor: 'rgba(93, 175, 89, 0.1)',
            borderWidth: 3,
            minBarLength: 25
          },
        ],
      },
    });
  }


  onChange() {
    this.select = document.getElementById("id_oils");
    this.value = this.select.value;
    var barFilter = this.dataSource.filter((dataSource:any) =>
    {
      return dataSource.oil_names==this.value;
    })
    console.log(barFilter)
    this.acidValue = barFilter.map((data: any) => data.acid_value);
    this.acidName = barFilter.map((data: any) => data.name_acids);
    this.chart.destroy();
    this.chart = new Chart('canvas', {
      type: 'bar',
      plugins: [ChartDataLabels],
      data: {
        labels: this.acidName,
        datasets: [
          {
            data: this.acidValue,
            borderColor: '#3e95cd',
            label: 'Значение',
            backgroundColor: 'rgba(93, 175, 89, 0.1)',
            borderWidth: 3,
            minBarLength: 25,
          },
        ],
      },
      options:{
        scales: {
          y: {
            beginAtZero: true
          }
      }
    }
  }
  );
  }


}
