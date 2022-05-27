import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Oil } from 'src/app/interface/tableInterface/oil';
import { OilService } from 'src/app/service/oil.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-oilTable',
  templateUrl: './oilTable.component.html',
  styleUrls: ['./oilTable.component.css']
})
@Injectable()
export class OilTableComponent implements OnInit {

  public Oils: Oil[] = [];
  public editOils: Oil | undefined;
  public deleteOils: Oil | undefined;

  displayedColumns: string[] = ['id_oil', 'oil_name', 'oil_country', 'oil_maker', 'oil_sort', 'oil_note','clean'];
  dataSource = new MatTableDataSource<Oil>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  fileName= 'ExportedOil.xlsx';

  constructor( private oilService: OilService) { }

  ngOnInit() {
    this.getOil();
  }

  exportToExcel():void {
    const ws: xlsx.WorkSheet =xlsx.utils.json_to_sheet(this.dataSource.data);

    const wb: xlsx.WorkBook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    xlsx.writeFile(wb, this.fileName);
   }

  public getOil(): void {
    this.oilService.getOil().subscribe({
      next: (response: Oil[]) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenOilModal(mode: string, Oils?: Oil): void {
    const container = document.getElementById('nav-oil');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addOilModal');
    } else if (mode === 'delete') {
      this.deleteOils = Oils;
      button.setAttribute('data-target', '#deleteOilModal');
    } else if (mode === 'edit') {
      this.editOils = Oils;
      button.setAttribute('data-target', '#editOilModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddOil(addForm: NgForm): void {
    document.getElementById('add-oil-form')?.click();
    this.oilService.addOil(addForm.value).subscribe({
      next: (response: Oil) => {
        console.log(response);
        this.getOil();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }



  public onUpdateOil(Oils: Oil): void {
    this.editOils = Oils;
    this.oilService.updateOil(Oils).subscribe({
      next: (response: Oil) => {
        console.log(response);
        this.getOil();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteOil(id_oil: number): void {
    this.oilService.deleteOil(id_oil).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getOil();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
}
