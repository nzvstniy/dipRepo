import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PlantOil } from "../interface/tableInterface/plantOil";

@Injectable({
  providedIn: 'root'
})
export class PlantOilService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPlantOil(): Observable<PlantOil[]> {
    return this.http.get<PlantOil[]>(`${this.apiServerUrl}/table/plantOil/all`);
  }
  public addPlantOil(plantOils: PlantOil): Observable<PlantOil> {
    return this.http.post<PlantOil>(`${this.apiServerUrl}/table/plantOil/add`, plantOils);
  }

  public updatePlantOil(plantOils: PlantOil): Observable<PlantOil> {
    return this.http.put<PlantOil>(`${this.apiServerUrl}/table/plantOil/update`, plantOils);
  }

  public deletePlantOil(id_plant_oil: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/table/plantOil/delete/${id_plant_oil}`);
  }

}
