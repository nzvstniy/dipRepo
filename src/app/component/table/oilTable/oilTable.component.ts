import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Oil } from 'src/app/interface/tableInterface/oil';
import { OilService } from 'src/app/service/oil.service';

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
  dtOptions: DataTables.Settings={};
  refresh(): void {
    window.location.reload();
  };
  constructor( private oilService: OilService) { }

  ngOnInit() {
    this.getOil();
    this.dtOptions = {
      pagingType: 'first_last_numbers',
      pageLength: 5,
      processing: true,
      "language": {
        "info": "Показано _PAGE_ из _PAGES_ страниц.",
        "infoEmpty":"Не найдено.",
        "zeroRecords":"Нет записей.",
        "infoFiltered": "Отфильтровано по _MAX_.",
        "lengthMenu": 'Показать <select>'+
                    '<option value="5">5</option>'+
                    '<option value="10">10</option>'+
                    '<option value="20">20</option>'+
                    '<option value="30">30</option>'+
                    '<option value="40">40</option>'+
                    '<option value="50">50</option>'+
                    '<option value="-1">Все</option>'+
                    '</select> записей',
          "search": "Поиск:",
          "paginate": {
            "first": "Первая",
            "last":"Последняя",
            "next":"",
            "previous":""
          }
        }
    }
  }
  public getOil(): void {
    this.oilService.getOil().subscribe({
      next: (response: Oil[]) => {
        this.Oils = response;
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
      button.setAttribute('data-target', '#editAcidModal');
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
        this.refresh();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }



  public onUpdateOil(Oils: Oil): void {
    this.editOils = Oils;
    this.oilService.updateOil(Oils).subscribe({
      next: (response: Oil) => {
        console.log(response);
        this.getOil();
        this.refresh();
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
        this.refresh();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
}
