import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlantOil } from 'src/app/interface/tableInterface/plantOil';
import { PlantOilService } from 'src/app/service/plantOil.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-plantOilTable',
  templateUrl: './plantOilTable.component.html',
  styleUrls: ['./plantOilTable.component.css']
})
@Injectable()
export class PlantOilTableComponent implements OnInit {

  public PlantOils: PlantOil[] = [];
  public editPlantOils: PlantOil | undefined;
  public deletePlantOils: PlantOil | undefined;

  displayedColumns: string[] = ['id_plant_oil', 'plant_oil_name', 'plant_oil_description', 'clean'];
  dataSource = new MatTableDataSource<PlantOil>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  fileName= 'ExportedPlantOil.xlsx';

  constructor( private plantOilService: PlantOilService) { }

  ngOnInit() {
    this.getPlantOil();
  }

  exportToExcel():void {
    const ws: xlsx.WorkSheet =xlsx.utils.json_to_sheet(this.dataSource.data);

    const wb: xlsx.WorkBook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    xlsx.writeFile(wb, this.fileName);
   }

  public getPlantOil(): void {
    this.plantOilService.getPlantOil().subscribe({
      next: (response: PlantOil[]) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  public onOpenPlantOilModal(mode: string, PlantOils?: PlantOil): void {
    const container = document.getElementById('nav-plant-oil');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPlantOilModal');
    } else if (mode === 'delete') {
      this.deletePlantOils = PlantOils;
      button.setAttribute('data-target', '#deletePlantOilModal');
    } else if (mode === 'edit') {
      this.editPlantOils = PlantOils;
      button.setAttribute('data-target', '#editPlantOilModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddPlantOil(addForm: NgForm): void {
    document.getElementById('add-plant-oil-form')?.click();
    this.plantOilService.addPlantOil(addForm.value).subscribe({
      next: (response: PlantOil) => {
        console.log(response);
        this.getPlantOil();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }



  public onUpdatePlantOil(PlantOils: PlantOil): void {
    this.editPlantOils = PlantOils;
    this.plantOilService.updatePlantOil(PlantOils).subscribe({
      next: (response: PlantOil) => {
        console.log(response);
        this.getPlantOil();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeletePlantOil(id_plant_oil: number): void {
    this.plantOilService.deletePlantOil(id_plant_oil).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getPlantOil();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
}
