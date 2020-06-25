import { Injectable } from '@angular/core';
/*Se deben importar las librerias para el amnejo de HTTP*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contract } from '../contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private urlApi = '/API_DWH/api/';
  constructor(private http: HttpClient) { }

  async getAllContracts(): Promise<Contract[]> {
    let action = 'contract/Get';
    let url = this.urlApi + action;
    console.log(url);
    return this.http.get<Contract[]>(url).toPromise();
      
  }
}
