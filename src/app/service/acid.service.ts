import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Acid } from '../interface/tableInterface/acid';

@Injectable({
  providedIn: 'root'
})
export class AcidService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAcid(): Observable<Acid[]> {
    return this.http.get<Acid[]>(`${this.apiServerUrl}/table/acid/all`);
  }

  public addAcid(acids: Acid): Observable<Acid> {
    return this.http.post<Acid>(`${this.apiServerUrl}/table/acid/add`, acids);
  }

  public updateAcid(acids: Acid): Observable<Acid> {
    return this.http.put<Acid>(`${this.apiServerUrl}/table/acid/update`, acids);
  }

  public deleteAcid(id_acid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/table/acid/delete/${id_acid}`);
  }
}
