import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from '../rol';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  urlApi = '/API_DWH/api/Role';

  constructor(
    private http: HttpClient
  ) { }

  async getRoles(): Promise<Rol[]>{
    let url = this.urlApi + '/Get';
    return this.http.get<Rol[]>(url).toPromise();
  }
}
