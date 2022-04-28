import { oAcid } from './../interface/tableInterface/o_Acid';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class O_AcidService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getO_Acid(): Observable<oAcid[]> {
    return this.http.get<oAcid[]>(`${this.apiServerUrl}/table/oAcid/all`);
  }

  public addO_Acid(oAcids: oAcid): Observable<oAcid> {
    return this.http.post<oAcid>(`${this.apiServerUrl}/table/oAcid/add`, oAcids);
  }

  public updateO_Acid(oAcids: oAcid): Observable<oAcid> {
    return this.http.put<oAcid>(`${this.apiServerUrl}/table/oAcid/update`, oAcids);
  }

  public deleteO_Acid(id_oil: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/table/oAcid/delete/${id_oil}`);
  }

}
