import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Oil } from "../interface/tableInterface/oil";

@Injectable({
  providedIn: 'root'
})
export class OilService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getOil(): Observable<Oil[]> {
    return this.http.get<Oil[]>(`${this.apiServerUrl}/table/oil/all`);
  }
  public addOil(Oils: Oil): Observable<Oil> {
    return this.http.post<Oil>(`${this.apiServerUrl}/table/oil/add`, Oils);
  }

  public updateOil(Oils: Oil): Observable<Oil> {
    return this.http.put<Oil>(`${this.apiServerUrl}/table/oil/update`, Oils);
  }

  public deleteOil(id_oil: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/table/oil/delete/${id_oil}`);
  }

}
