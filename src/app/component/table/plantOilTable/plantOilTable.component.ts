import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantOil } from 'src/app/interface/tableInterface/plantOil';
import { PlantOilService } from 'src/app/service/plantOil.service';

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

  dtOptions: DataTables.Settings={};

  constructor( private plantOilService: PlantOilService) { }

  ngOnInit() {
    this.getPlantOil();
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
  public getPlantOil(): void {
    this.plantOilService.getPlantOil().subscribe({
      next: (response: PlantOil[]) => {
        this.PlantOils = response;
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
        addForm.reset();
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
