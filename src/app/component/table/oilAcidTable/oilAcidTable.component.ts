import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OilAcid } from 'src/app/interface/tableInterface/oilAcid';
import { OilAcidService } from 'src/app/service/oilAcid.service';

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
  dtOptions: DataTables.Settings={};
  refresh(): void {
    window.location.reload();
  };
  constructor( private oilAcidService: OilAcidService,) { }

  ngOnInit() {
    this.getOilAcid();
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
public getOilAcid(): void {
  this.oilAcidService.getOilAcid().subscribe({
    next: (response: OilAcid[]) => {
      this.OilAcids = response;

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
      this.refresh();
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
      this.refresh();
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
      this.refresh();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  })
}
}
