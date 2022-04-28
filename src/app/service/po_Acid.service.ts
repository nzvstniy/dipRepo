import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { poAcid } from "../interface/tableInterface/po_Acid";

@Injectable({
  providedIn: 'root'
})
export class Po_AcidService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPo_Acid(): Observable<poAcid[]> {
    return this.http.get<poAcid[]>(`${this.apiServerUrl}/table/poAcid/all`);
  }
  public addPo_Acid(poAcids: poAcid): Observable<poAcid> {
    return this.http.post<poAcid>(`${this.apiServerUrl}/table/poAcid/add`, poAcids);
  }

  public updatePo_Acid(poAcids: poAcid): Observable<poAcid> {
    return this.http.put<poAcid>(`${this.apiServerUrl}/table/poAcid/update`, poAcids);
  }

  public deletePo_Acid(id_plant_oil: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/table/poAcid/delete/${id_plant_oil}`);
  }

}
