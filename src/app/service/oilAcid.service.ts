import { OilAcid } from '../interface/tableInterface/oilAcid';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class OilAcidService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getOilAcid(): Observable<OilAcid[]> {
    return this.http
    .get<OilAcid[]>(`${this.apiServerUrl}/table/oilAcid/all`);
  }

  public addOilAcid(OilAcids: OilAcid): Observable<OilAcid> {
    return this.http.post<OilAcid>(`${this.apiServerUrl}/table/oilAcid/add`, OilAcids);
  }

  public updateOilAcid(OilAcids: OilAcid): Observable<OilAcid> {
    return this.http.put<OilAcid>(`${this.apiServerUrl}/table/oilAcid/update`, OilAcids);
  }

  public deleteOilAcid(id_acid_oil: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/table/oilAcid/delete/${id_acid_oil}`);
  }

}
