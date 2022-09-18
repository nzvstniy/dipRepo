import { AcidService } from './../../../service/acid.service';
import { PlantOilTableComponent } from './../plantOilTable/plantOilTable.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlantOilAcid } from 'src/app/interface/tableInterface/plantOilAcid';
import { PlantOilAcidService } from 'src/app/service/plantOilAcid.service';
import * as xlsx from 'xlsx';
import { PlantOilService } from 'src/app/service/plantOil.service';
import { PlantOil } from 'src/app/interface/tableInterface/plantOil';
import { Acid } from 'src/app/interface/tableInterface/acid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantOilAcidTable',
  templateUrl: './plantOilAcidTable.component.html',
  styleUrls: ['./plantOilAcidTable.component.css']
})
@Injectable()
export class PlantOilAcidTableComponent implements OnInit {

  public PlantOilAcids: PlantOilAcid[] = [];
  public editPlantOilAcids: PlantOilAcid | undefined;
  public deletePlantOilAcids: PlantOilAcid | undefined;
  public PlantOils: PlantOil[] = [];
  public Acids: Acid[] = [];

  displayedColumns: string[] = ['id_acid_plant', 'name_oils', 'name_acids', 'fat_acid_content_min', 'fat_acid_content_max','clean'];
  dataSource = new MatTableDataSource<PlantOilAcid>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  fileName= 'ExportedPlantOilAcid.xlsx';

  constructor(private plantOilAcidService: PlantOilAcidService, private plantService: PlantOilService, private acidService: AcidService, private router:Router) { }

  ngOnInit() {
    this.getPlantOilAcid();
    this.getPlantOil();
    this.getAcid();
  }

  exportToExcel():void {
    const ws: xlsx.WorkSheet =xlsx.utils.json_to_sheet(this.dataSource.data);

    const wb: xlsx.WorkBook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    xlsx.writeFile(wb, this.fileName);
   }

  public getPlantOilAcid(): void {
    this.plantOilAcidService.getPlantOilAcid().subscribe({
      next: (response: PlantOilAcid[]) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  public getPlantOil(): void {
    this.plantService.getPlantOil().subscribe({
      next: (response: PlantOil[]) => {
       this.PlantOils = response;
      }
    })
  }
  public getAcid(): void {
    this.acidService.getAcid().subscribe({
      next: (response: Acid[]) => {
        this.Acids = response;
      }
    })
  }

  public onOpenPlantOilAcidModal(mode: string, PlantOilAcids?: PlantOilAcid): void {
    const container = document.getElementById('nav-plant-oil-acid');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPlantOilAcidModal');
    } else if (mode === 'delete') {
      this.deletePlantOilAcids = PlantOilAcids;
      button.setAttribute('data-target', '#deletePlantOilAcidModal');
    } else if (mode === 'edit') {
      this.editPlantOilAcids = PlantOilAcids;
      button.setAttribute('data-target', '#editPlantOilAcidModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddPlantOilAcid(addForm: NgForm): void {
    document.getElementById('add-plant-oil-acid-form')?.click();
    this.plantOilAcidService.addPlantOilAcid(addForm.value).subscribe({
      next: (response: PlantOilAcid) => {
        console.log(response);
        this.getPlantOilAcid();
        addForm.reset();

      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }



  public onUpdatePlantOilAcid(PlantOilAcids: PlantOilAcid): void {
    this.editPlantOilAcids = PlantOilAcids;
    this.plantOilAcidService.updatePlantOilAcid(PlantOilAcids).subscribe({
      next: (response: PlantOilAcid) => {
        console.log(response);
        this.getPlantOilAcid();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeletePlantOilAcid(id_acid_plant: number): void {
    this.plantOilAcidService.deletePlantOilAcid(id_acid_plant).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getPlantOilAcid();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
}
