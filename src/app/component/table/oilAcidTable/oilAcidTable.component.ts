import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { OilAcid } from 'src/app/interface/tableInterface/oilAcid';
import { OilAcidService } from 'src/app/service/oilAcid.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-oilAcidTable',
  templateUrl: './oilAcidTable.component.html',
  styleUrls: ['./oilAcidTable.component.css']
})
@Injectable()
export class OilAcidTableComponent implements OnInit {
  public OilAcids: OilAcid[] = [];
  public editOilAcids: OilAcid | undefined;
  public deleteOilAcids: OilAcid | undefined;

  displayedColumns: string[] = ['id_acid_oil', 'id_oils', 'name_acids', 'acid_value','clean'];
  dataSource = new MatTableDataSource<OilAcid>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  fileName= 'ExportedOilAcid.xlsx';

  constructor( private oilAcidService: OilAcidService) { }

  ngOnInit() {
    this.getOilAcid();



  }

exportToExcel():void {
  const ws: xlsx.WorkSheet =xlsx.utils.json_to_sheet(this.dataSource.data);

  const wb: xlsx.WorkBook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

  xlsx.writeFile(wb, this.fileName);
 }


public getOilAcid(): void {
  this.oilAcidService.getOilAcid().subscribe({
    next: (response: OilAcid[]) => {
      this.dataSource.data = response;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  })
}
public onOpenOilAcidModal(mode: string, OilAcids?: OilAcid): void {
  const container = document.getElementById('nav-oil-acid');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addOilAcidModal');
  } else if (mode === 'delete') {
    this.deleteOilAcids = OilAcids;
    button.setAttribute('data-target', '#deleteOilAcidModal');
  } else if (mode === 'edit') {
    this.editOilAcids = OilAcids;
    button.setAttribute('data-target', '#editOilAcidModal');
  }

  container?.appendChild(button);
  button.click();
}

public onAddOilAcid(addForm: NgForm): void {
  document.getElementById('add-oil-acid-form')?.click();
  this.oilAcidService.addOilAcid(addForm.value).subscribe({
    next: (response: OilAcid) => {
      console.log(response);
      this.getOilAcid();
      addForm.reset();

    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  })
}



public onUpdateOilAcid(OilAcids: OilAcid): void {
  this.editOilAcids = OilAcids;
  this.oilAcidService.updateOilAcid(OilAcids).subscribe({
    next: (response: OilAcid) => {
      console.log(response);
      this.getOilAcid();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  })
}

public onDeleteOilAcid(id_acid_oil: number): void {
  this.oilAcidService.deleteOilAcid(id_acid_oil).subscribe({
    next: (response: void) => {
      console.log(response);
      this.getOilAcid();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  })
}

}
