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
  constructor(
    private router: Router,
    private userService: UserService

  ) { }

  ngOnInit() {
    this.userAuth = this.userService.getUserAuth();
  }

  logout() {
    if (confirm("¿Está seguro que desea cerrar sesión?")) {
      localStorage.setItem("CurrentUser", JSON.stringify("id:null"));
      this.router.navigate(["/Login"]);
    }
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

    }
    console.log(pathToNavigate);
    this.router.navigate([pathToNavigate]);
  }

  setActive(idElement: any) {
    console.log(idElement);



    let btnRequests = document.getElementById("nav-requests");
    btnRequests.classList.remove("active");

    let btnClients = document.getElementById(idElement);
    btnClients.classList.remove("active");

    // let btnUsers= document.getElementById("nav-users");
    // btnUsers.classList.remove("active");

    // let btnLogout= document.getElementById("nav-logout");
    // btnLogout.classList.remove("active");    

    let btn = document.getElementById(idElement);
    console.log(btn);
    btn.classList.add("active");

    if (idElement == "nav-logout") {
      this.logout();
    }

    this.navigate(idElement);
  }

}
