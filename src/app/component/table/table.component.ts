import { Po_AcidService } from './../../service/po_Acid.service';
import { PlantOilService } from './../../service/plantOil.service';
import { O_AcidService } from './../../service/0_Acid.service';

import { AcidService } from 'src/app/service/acid.service';
import { poAcid } from './../../interface/tableInterface/po_Acid';
import { PlantOil } from './../../interface/tableInterface/plantOil';
import { Oil } from './../../interface/tableInterface/oil';
import { oAcid } from './../../interface/tableInterface/o_Acid';
import { Acid } from './../../interface/tableInterface/acid';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Injectable, Output, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { OilService } from 'src/app/service/oil.service';
import {Sort} from '@angular/material/sort'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
@Injectable()
export class TableComponent implements OnInit {



  public acidColumns = [ 'id_acid', 'acid_name', 'acid_full_name', 'acid_description'];
  public oAcidColumns = [ 'id_oil', 'acid_name', 'acid_value'];
  public oilColumns = [ 'id', 'name', 'country', 'maker', 'sort', 'note'];
  public plantOilColumns = [ 'id', 'name', 'description'];
  public poAcidColumns = [ 'id', 'name', 'contentMin', 'contentMax'];

  public acids: Acid[] = [];
  public editAcids: Acid | undefined;
  public deleteAcid: Acid | undefined;



  public oAcids: oAcid[] = [];
  public editO_Acids: oAcid | undefined;
  public deleteO_Acids: oAcid | undefined;

  public oils: Oil[] = [];
  public editOils: Oil | undefined;
  public deleteOils: Oil | undefined;

  public plantOils: PlantOil[] = [];
  public editPlantOils: PlantOil | undefined;
  public deletePlantOils: PlantOil | undefined;

  public poAcids: poAcid[] = [];
  public editPo_Acids: poAcid | undefined;
  public deletePo_Acids: poAcid | undefined;



  constructor(private acidService: AcidService,
    private oAcidService: O_AcidService,
    private oilService: OilService,
    private plantOilService: PlantOilService,
    private poAcidService: Po_AcidService,
    private cdr: ChangeDetectorRef
   ) {  }



  ngOnInit() {

    this.getAcid();
    this.getO_Acid();
    this.getOil();
    this.getPlantOil();
    this.getPo_Acid();


  }

  public getAcid(): void {
    this.acidService.getAcid().subscribe({
      next: (response: Acid[]) => {
        this.acids = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getO_Acid(): void {
    this.oAcidService.getO_Acid().subscribe({
      next: (response: oAcid[]) => {
        this.oAcids = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getOil(): void {
    this.oilService.getOil().subscribe({
      next: (response: Oil[]) => {
        this.oils = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getPlantOil(): void {
    this.plantOilService.getPlantOil().subscribe({
      next: (response: PlantOil[]) => {
        this.plantOils = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getPo_Acid(): void {
    this.poAcidService.getPo_Acid().subscribe({
      next: (response: poAcid[]) => {
        this.poAcids = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }


  public onOpenOAcidModal(mode: string, oAcids?: oAcid): void {
    const container = document.getElementById('nav-o-acid');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addOAcidModal');
    } else if (mode === 'delete') {
      this.deleteO_Acids = oAcids;
      button.setAttribute('data-target', '#deleteOAcidModal');
    } else if (mode === 'edit') {
      this.editO_Acids = oAcids;
      button.setAttribute('data-target', '#editOAcidModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddOAcid(addForm: NgForm): void {
    document.getElementById('add-o-acid-form')?.click();
    this.oAcidService.addO_Acid(addForm.value).subscribe({
      next: (response: oAcid) => {
        console.log(response);
        this.getO_Acid();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }



  public onUpdateOAcid(oAcids: oAcid): void {
    this.editO_Acids = oAcids;
    this.oAcidService.updateO_Acid(oAcids).subscribe({
      next: (response: oAcid) => {
        console.log(response);
        this.getAcid();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteOAcid(id_oil: number): void {
    this.oAcidService.deleteO_Acid(id_oil).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getO_Acid();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenOilModal(mode: string, oils?: Oil): void {
    const container = document.getElementById('nav-oil');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addOilModal');
    } else if (mode === 'delete') {
      this.deleteOils = oils;
      button.setAttribute('data-target', '#deleteOilModal');
    } else if (mode === 'edit') {
      this.editOils = oils;
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
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }



  public onUpdateOil(oils: Oil): void {
    this.editOils = oils;
    this.oilService.updateOil(oils).subscribe({
      next: (response: Oil) => {
        console.log(response);
        this.getAcid();
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
        this.getAcid();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenPlantOilModal(mode: string, plantOils?: PlantOil): void {
    const container = document.getElementById('nav-plant-oil');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPlantOilModal');
    } else if (mode === 'delete') {
      this.deletePlantOils = plantOils;
      button.setAttribute('data-target', '#deletePlantOilModal');
    } else if (mode === 'edit') {
      this.editPlantOils = plantOils;
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



  public onUpdatePlantOil(plantOils: PlantOil): void {
    this.editPlantOils = plantOils;
    this.plantOilService.updatePlantOil(plantOils).subscribe({
      next: (response: PlantOil) => {
        console.log(response);
        this.getAcid();
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
        this.getAcid();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenPoAcidModal(mode: string, poAcids?: poAcid): void {
    const container = document.getElementById('nav-po-acid');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPoAcidModal');
    } else if (mode === 'delete') {
      this.deletePo_Acids = poAcids;
      button.setAttribute('data-target', '#deletePoAcidModal');
    } else if (mode === 'edit') {
      this.deletePo_Acids = poAcids;
      button.setAttribute('data-target', '#editPoAcidModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddPoAcid(addForm: NgForm): void {
    document.getElementById('add-po-acid-form')?.click();
    this.poAcidService.addPo_Acid(addForm.value).subscribe({
      next: (response: poAcid) => {
        console.log(response);
        this.getPo_Acid();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }



  public onUpdatePoAcid(poAcids: poAcid): void {
    this.editPo_Acids = poAcids;
    this.poAcidService.updatePo_Acid(poAcids).subscribe({
      next: (response: poAcid) => {
        console.log(response);
        this.getAcid();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeletePoAcid(id_plant_oil: number): void {
    this.poAcidService.deletePo_Acid(id_plant_oil).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getAcid();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenAcidModal(mode: string, acids?: Acid): void {
    const container = document.getElementById('nav-acid');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAcidModal');
    } else if (mode === 'delete') {
      this.deleteAcid = acids;
      button.setAttribute('data-target', '#deleteAcidModal');
    } else if (mode === 'edit') {
      this.editAcids = acids;
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
    })
  }



  public onUpdateAcid(acids: Acid): void {
    this.editAcids = acids;
    this.acidService.updateAcid(acids).subscribe({
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

