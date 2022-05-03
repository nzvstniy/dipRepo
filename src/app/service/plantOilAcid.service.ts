import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PlantOilAcid } from "../interface/tableInterface/plantOilAcid";

@Injectable({
  providedIn: 'root'
})
export class PlantOilAcidService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPlantOilAcid(): Observable<PlantOilAcid[]> {
    return this.http.get<PlantOilAcid[]>(`${this.apiServerUrl}/table/plantOilAcid/all`);
  }
  public addPlantOilAcid(PlantOilAcids: PlantOilAcid): Observable<PlantOilAcid> {
    return this.http.post<PlantOilAcid>(`${this.apiServerUrl}/table/plantOilAcid/add`, PlantOilAcids);
  }

  public updatePlantOilAcid(PlantOilAcids: PlantOilAcid): Observable<PlantOilAcid> {
    return this.http.put<PlantOilAcid>(`${this.apiServerUrl}/table/plantOilAcid/update`, PlantOilAcids);
  }

  public deletePlantOilAcid(id_acid_plant: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/table/plantOilAcid/delete/${id_acid_plant}`);
  }

}
