import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Acid } from 'src/app/interface/tableInterface/acid';
import { AcidService } from 'src/app/service/acid.service';

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
  dtOptions: DataTables.Settings={};

  refresh(): void {
    window.location.reload();
  };



  constructor(private acidService: AcidService, private router:Router) {

   }

  ngOnInit() {


    this.getAcid();
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



  public getAcid(): void {
    this.acidService.getAcid().subscribe({
      next: (response: Acid[]) => {
        this.Acids = response;

      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
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
        this.refresh();
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
        this.refresh();
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
        this.refresh();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
