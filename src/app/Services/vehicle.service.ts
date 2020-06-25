import { Injectable } from '@angular/core';

/*Se deben importar las librerias para el amnejo de HTTP*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../vehicle';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private urlApi = '/API_DWH/api/';
  constructor(private http: HttpClient) { }

  async getAllVehicles(): Promise<Vehicle[]> {
    let action = 'vehicle/Get';
    let url = this.urlApi + action;
    console.log(url);
    return this.http.get<Vehicle[]>(url).toPromise();
      
  }
}
