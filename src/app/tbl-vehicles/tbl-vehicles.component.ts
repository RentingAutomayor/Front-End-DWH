import { Component, OnInit } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { Vehicle} from '../vehicle';
import { VehicleService } from '../Services/vehicle.service';
import { SharedFunctions } from '../shared/sharedFunctions';

@Component({
  selector: 'app-tbl-vehicles',
  templateUrl: './tbl-vehicles.component.html',
  styleUrls: ['./tbl-vehicles.component.scss']
})
export class TblVehiclesComponent implements OnInit {
   //pagination
   p:number = 1;
   isAwaiting:boolean;
   lsVehicle: Vehicle[];

   
  constructor(
    private vechicleSercice:VehicleService
  ) { }

  async ngOnInit() {
    this.isAwaiting = true;
    this.lsVehicle = await this.vechicleSercice.getAllVehicles();
    console.log(this.lsVehicle);
    this.isAwaiting = false;
  }

  exportData(){
    let data = Vehicle.mapDataToExport(this.lsVehicle);
    let contentCSV = SharedFunctions.prepareDataToCSV(data);
    SharedFunctions.downloadCSVFile(contentCSV,'RA_Vehiculos');
  }

}
