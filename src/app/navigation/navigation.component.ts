import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { User } from '../user';
import { UserService } from '../Services/user.service';
import { stringToFileBuffer } from '@angular-devkit/core/src/virtual-fs/host';
import { path } from '@angular-devkit/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  userAuth: User;
  private HasPermissionClients: boolean;
  private HasPermissionProviders: boolean;
  private HasPermissionVehicles: boolean;
  private HasPermissionContracts: boolean;
  private HasPermissionUsers: boolean;
  private HasPermissionRolesAndPermissions: boolean;
  private HasPermissionRequests: boolean;

  constructor(
    private router: Router,
    private userService: UserService

  ) {
    this.HasPermissionClients = false;
    this.HasPermissionProviders = false;
    this.HasPermissionVehicles = false;
    this.HasPermissionContracts = false;
    this.HasPermissionUsers = false;
    this.HasPermissionRolesAndPermissions = false;
    this.HasPermissionRequests = false;
  }

  ngOnInit() {
    this.userAuth = this.userService.getUserAuth();
    this.VerifyAccesControl(this.userAuth);
  }

  logout() {
    if (confirm("¿Está seguro que desea cerrar sesión?")) {
      localStorage.setItem("CurrentUser", JSON.stringify("document:null"));
      this.router.navigate(["/Login"]);
    }
  }

  VerifyAccesControl(user: User) {
    console.log("Verificación y otorgamiento de permisos");
    console.log(user);
    user.rol.permissionByModule.forEach(p => {
      console.log("Modulo a validar: " + p.module.name.toUpperCase());
      switch (p.module.name.toUpperCase()) {
        case 'SOLICITUDES':
          p.lsPermission.forEach(pbm => {
            if (pbm.name.toUpperCase() == "LEER") {
              this.HasPermissionRequests = true;
            }
          });
          break;
        case 'CLIENTES':
          p.lsPermission.forEach(pbm => {
            if (pbm.name.toUpperCase() == "LEER") {
              this.HasPermissionClients = true;
            }
          });
          break;
        case 'PROVEEDORES':
          p.lsPermission.forEach(pbm => {
            if (pbm.name.toUpperCase() == "LEER") {
              this.HasPermissionProviders = true;
            }
          });
          break;
        case 'VEHICULOS':
          p.lsPermission.forEach(pbm => {
            if (pbm.name.toUpperCase() == "LEER") {
              this.HasPermissionVehicles = true;
            }
          });
          break;
        case 'CONTRATOS':
          p.lsPermission.forEach(pbm => {
            if (pbm.name.toUpperCase() == "LEER") {
              this.HasPermissionContracts = true;
            }
          });
          break;
        case 'USUARIOS':
          p.lsPermission.forEach(pbm => {
            if (pbm.name.toUpperCase() == "LEER") {
              this.HasPermissionUsers = true;
            }
          });
          break;
        case 'ROLESYPERMISOS':
          p.lsPermission.forEach(pbm => {
            if (pbm.name.toUpperCase() == "LEER") {
              this.HasPermissionRolesAndPermissions = true;
            }
          });
          break;
      }
    });
  }

  navigate(navElement: string) {
    var pathToNavigate = "";
    console.log("ruta: " + navElement)
    switch (navElement) {
      case 'nav-clients':
        pathToNavigate = "/MasterClients";
        break;
      case 'nav-provider':
        pathToNavigate = "/MasterProvider";
        break;
      case 'nav-vehicle':
        pathToNavigate = "/MasterVehicles";
        break;
      case 'nav-contract':
        pathToNavigate = "/MasterContracts";
        break;
      case 'nav-users':
        pathToNavigate = "/MasterUsers";
        break;
      case 'nav-roles':
        pathToNavigate = "/MasterRoles";
        break;
      case 'nav-requests':
        pathToNavigate = "/MasterRequests";
        break;
    }

    if (navElement != 'nav-logout') {
      console.log(pathToNavigate);
      this.router.navigate([pathToNavigate]);
    }
  }

  setActive(idElement: any) {
    console.log(idElement);

    let aBtnNav = document.getElementsByTagName('a');

    for (var i = 0; i <= aBtnNav.length; i++) {
      console.warn("boton de navegación");
      console.log(aBtnNav[i]);
    }

    let btnNav = document.getElementById(idElement);
    btnNav.classList.add("active");


    if (idElement == "nav-logout") {
      this.logout();
    }

    this.navigate(idElement);
  }

}
