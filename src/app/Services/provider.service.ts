import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
/*importamos la libreria para el manejo de HTTP */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Ally } from '../ally';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  lsProvider: Ally[];
  constructor(private http: HttpClient) { }

  async getAllProvider(): Promise<Ally[]>{
    let url = '/API_DWH/api/Provider/Get';
    console.log(url);
    return this.http.get<Ally[]>(url).toPromise();
  }
}
