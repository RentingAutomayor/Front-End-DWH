import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { PermissionByModule } from '../permissionByModule';
import { ModuleService } from '../Services/module.service';
import { Module } from '../module';
import { Rol } from '../rol';
import { Permission } from '../Permission';
import { PermissionByRol } from '../permissionByRol';
import { FormGroup,FormControl,FormBuilder,FormArray } from '@angular/forms';

@Component({
  selector: 'app-tbl-permisssion-by-module',
  templateUrl: './tbl-permisssion-by-module.component.html',
  styleUrls: ['./tbl-permisssion-by-module.component.scss']
})
export class TblPermisssionByModuleComponent implements OnInit,OnChanges {
  private lsPermissionByModule: PermissionByModule[];
  lsModules: Module[];  
  @Input() rolToSetPermission: Rol;
  @Input() lsPermissionByRol:PermissionByModule[];
  isAwaiting:boolean;
 
 
  constructor(
    private modulesService: ModuleService ,
    private frmBuilder: FormBuilder  
  ) {
    console.log("Acá inicia el constructor");
  } 
  


  ngOnInit() {   
    this.isAwaiting = true;
    console.log("Algo Funciona acá") ;
    this.lsPermissionByModule = [];
    console.log("Acá inicia el ngOnInit");
    console.log(this.lsPermissionByRol);
    this.initializecomponents();
    this.isAwaiting = false;
  }

  async initializecomponents(){
    this.lsPermissionByModule = await this.modulesService.getPermissionByModule();    
    console.log("Estos son los módulos despues de haber realizado cada validación");
    console.log(this.lsPermissionByModule);
    console.log("Estos son los permisos para el perfil");
    console.log(this.lsPermissionByRol);
    if(this.lsPermissionByRol.length >= 1){
      this.checkPermission();
    }
    
  }

  checkPermission() {
    
    this.ClearCheckPermission();

    this.lsPermissionByRol.forEach(permissionByMod => {
      permissionByMod.lsPermission.forEach(permission => {
        let idCheck = 'chk_' + permissionByMod.module.id.toString() + '_' + permission.id.toString();
        console.log("id check: " + idCheck);
        let checkBoxPermission = document.getElementById(idCheck); 
        //checkBoxPermission.checked;
        console.warn("CheckBox");
        console.log(checkBoxPermission);
      });
    });
  }

  ClearCheckPermission(){
    // this.lsPermissionByModule.forEach( permissionByMod => {
    //   permissionByMod.lsPermission.forEach( permission => {
    //     let idCheck = 'chk_' + permissionByMod.module.id.toString() + '_' + permission.id.toString();
    //     let checkBoxPermission = document.getElementById(idCheck); 
    //     //checkBoxPermission.checked = false;
    //   });
    // });
  }


  async SavePermissionByRol(){
    // alert("It's working from child it will be save permission from: " + this.rolToSetPermission.name);
    // let dictionaryPermission = [];
    // this.lsPermissionByModule.forEach( permissionByModule => {
    //   permissionByModule.lsPermission.forEach(perm =>{
    //     let idCheck = 'chk_'+permissionByModule.module.id +'_'+ perm.id;
    //     let chkPerm = document.getElementById(idCheck);        
    //     console.log(chkPerm); 
    //     // if(chkPerm.checked) {
    //     //   console.log("Se guadara el permiso: " + perm.name + " para el módulo: "+permissionByModule.module.name);
    //     //   dictionaryPermission.push({key: permissionByModule.module, value: perm });
    //     // }
    //   });
    // });

    // console.log(dictionaryPermission);
    // let permissionByRolStrc = this.CreatePermissionByModuleStructure(dictionaryPermission);
    // this.isAwaiting = true;
    // let rta = await this.modulesService.SavePermissionByRol(permissionByRolStrc);
    // this.isAwaiting = false;
    // if(rta.response){
    //   alert(rta.message);
    // }
    
  }

  CreatePermissionByModuleStructure(dictionaryPermission:any[]):PermissionByRol{
    let lsPermissionByMod : Permission[];
    let permByMod: PermissionByModule;
    let lsPermByMod : PermissionByModule[];
    let lsStructurePermissionByRol : PermissionByRol;

    lsStructurePermissionByRol = new PermissionByRol();
    lsStructurePermissionByRol.rol = this.rolToSetPermission;
    lsStructurePermissionByRol.permissionByModule = [];
    
    this.lsPermissionByModule.forEach( pbm =>{
      permByMod = new PermissionByModule();
      //Recorro todos todos los módulos 
      lsPermByMod = [];
      console.log(pbm.module.name);
      lsPermissionByMod = [];
      dictionaryPermission.forEach(dic => {
        
        //Verifico que el módulo exista dentro de los que están checkiados
        if(dic.key.id == pbm.module.id){
          //console.log("Se guardará el permiso: " + dic.value.name + " pra el módulo: " + dic.key.name);         
          lsPermissionByMod.push(dic.value);
        }
         //console.log("Lista de permisos para modulo");
         //console.log(lsPermissionByMod);       
      });

      if(lsPermissionByMod.length > 0){
        //console.log("Se crea estructura de permisos para el modulo: "+pbm.module.name);
        permByMod.module = pbm.module;
        permByMod.lsPermission = lsPermissionByMod;
        //console.log(permByMod);
        lsStructurePermissionByRol.permissionByModule.push(permByMod);
      }

    });  

    console.log(lsStructurePermissionByRol);
    return lsStructurePermissionByRol;

  }
 

  validatePermissionByModule(module_id, PerMod_id) {
    let valido = false;
    if (module_id == PerMod_id) {
      valido = true;
    }
    return valido;
  }



  ngOnChanges(changes: { [propKey: string]: SimpleChange }){   
    console.log(changes);
    for (let propName in changes) {
      if(propName == "lsPermissionByRol"){
         this.lsPermissionByRol = changes[propName].currentValue;
         console.log("Permisos por rol");
         console.log(this.lsPermissionByRol);
         this.checkPermission();
      }
    }
  }


}
