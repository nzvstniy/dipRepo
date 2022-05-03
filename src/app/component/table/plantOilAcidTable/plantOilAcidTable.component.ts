import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantOilAcid } from 'src/app/interface/tableInterface/plantOilAcid';
import { PlantOilAcidService } from 'src/app/service/plantOilAcid.service';

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
  dtOptions: DataTables.Settings={};

  refresh(): void {
    window.location.reload();
  };

  constructor(private plantOilAcidService: PlantOilAcidService,) { }

  ngOnInit() {
    this.getPlantOilAcid();
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
  public getPlantOilAcid(): void {
    this.plantOilAcidService.getPlantOilAcid().subscribe({
      next: (response: PlantOilAcid[]) => {
        this.PlantOilAcids = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
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
        this.refresh();
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
        this.refresh();
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
        this.refresh();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
}
