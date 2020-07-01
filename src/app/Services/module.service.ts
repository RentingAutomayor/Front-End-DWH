import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { PermissionByModule } from '../permissionByModule';
import { Rol } from '../rol';
import { PermissionByRol } from '../permissionByRol';
import { ResponseApi } from '../responseApi';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private urlApi = "/API_DWH/api/Module";
  private lsPermissionByModule : PermissionByModule[];
  private lsPermissionByRol: PermissionByModule[];
  private rolToSetPermission:Rol;
  HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  async getPermissionByModule():Promise<PermissionByModule[]>{
    let url = this.urlApi + '/GetPermissionByModule';
    return this.http.get<PermissionByModule[]>(url).toPromise();
  }

  async setRoleToPermission(rol:Rol){
    this.rolToSetPermission = rol;
    this.lsPermissionByRol = await  this.GetPermissionByRol(rol);
  }

  async getRoleToAsignPermission(){
    return this.rolToSetPermission;
  }


  async GetPermissionByRol(rol:Rol):Promise<PermissionByModule[]>{
    let url = this.urlApi + "/GetPermissionByRol?rol_id="+rol.id.toString();
    console.log(url);
    return this.http.get<PermissionByModule[]>(url).toPromise();
  }

  async SavePermissionByRol(permissionByRol:PermissionByRol):Promise<ResponseApi>{
    let url = this.urlApi + "/SavePermissionByRol";
    console.log("Petición...");
    console.log(permissionByRol);
    return this.http.post<ResponseApi>(url, permissionByRol, this.HttpOptions).toPromise();
  }
}
