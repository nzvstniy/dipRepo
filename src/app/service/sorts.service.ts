import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Sorts } from '../interface/tableInterface/sorts';

@Injectable({
  providedIn: 'root'
})
export class SortsService{

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSorts(): Observable<Sorts[]> {
    return this.http.get<Sorts[]>(`${this.apiServerUrl}/table/sorts/all`);
  }
}
