import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Acid } from 'src/app/interface/tableInterface/acid';
import { AcidService } from 'src/app/service/acid.service';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-acidTable',
  templateUrl: './acidTable.component.html',
  styleUrls: ['./acidTable.component.css']
})

@Injectable()
export class AcidTableComponent implements OnInit {

  public Acids: Acid[] = [];
  public editAcids: Acid | undefined;
  public deleteAcids: Acid | undefined;

  displayedColumns: string[] = ['id_acid', 'acid_name', 'acid_full_name', 'acid_description', 'clean'];
  dataSource = new MatTableDataSource<Acid>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  fileName= 'ExportedAcid.xlsx';


  constructor(private acidService: AcidService) {

   }

  ngOnInit() {
    this.getAcid();

  }

  exportToExcel():void {
    const ws: xlsx.WorkSheet =xlsx.utils.json_to_sheet(this.dataSource.data);

    const wb: xlsx.WorkBook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    xlsx.writeFile(wb, this.fileName);
   }

  public getAcid(): void {
    this.acidService.getAcid().subscribe({
      next: (response: Acid[]) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },

    })
  }



  public onOpenAcidModal(mode: string, Acids?: Acid): void {
    const container = document.getElementById('nav-acid');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAcidModal');
    } else if (mode === 'delete') {
      this.deleteAcids = Acids;
      button.setAttribute('data-target', '#deleteAcidModal');
    } else if (mode === 'edit') {
      this.editAcids = Acids;
      button.setAttribute('data-target', '#editAcidModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddAcid(addForm: NgForm): void {
    document.getElementById('add-acid-form')?.click();
    this.acidService.addAcid(addForm.value).subscribe({
      next: (response: Acid) => {
        console.log(response);
        this.getAcid();
        addForm.reset();

      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    }
    )
  }



  public onUpdateAcid(Acids: Acid): void {
    this.editAcids = Acids;
    this.acidService.updateAcid(Acids).subscribe({
      next: (response: Acid) => {
        console.log(response);
        this.getAcid();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteAcid(id_acid: number): void {
    this.acidService.deleteAcid(id_acid).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getAcid();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }


}
