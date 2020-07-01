import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Rol } from '../rol';
import { RoleService } from '../Services/role.service';
import { ModuleService } from '../Services/module.service';
import { PermissionByModule } from '../permissionByModule';



@Component({
  selector: 'app-tbl-roles',
  templateUrl: './tbl-roles.component.html',
  styleUrls: ['./tbl-roles.component.scss'],
 
})
export class TblRolesComponent implements OnInit {
  lsRoles: Rol[];
  //pagination
  p: number = 1;
  isAwaiting : boolean;
  rolToSetPermission:Rol;
  permissionByRol:PermissionByModule[];
 

  

  constructor(
    private roleService: RoleService,
    private moduleService: ModuleService
  ) { }
  

  async ngOnInit() {
    this.rolToSetPermission = new Rol();
    this.permissionByRol = [];
    this.isAwaiting = true;
    this.lsRoles = await this.roleService.getRoles();
    this.isAwaiting = false;
  }

  savePermissionByRole(){
    alert("it's working");
  }

  async MarkRole(rol:Rol){
    console.log(rol);
    this.rolToSetPermission = rol;
    this.permissionByRol = await this.moduleService.GetPermissionByRol(this.rolToSetPermission);
    
  }

}
