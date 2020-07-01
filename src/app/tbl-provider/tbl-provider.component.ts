import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../Services/provider.service';
import { Ally } from '../ally';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedFunctions } from '../shared/sharedFunctions';

@Component({
  selector: 'app-tbl-provider',
  templateUrl: './tbl-provider.component.html',
  styleUrls: ['./tbl-provider.component.scss']
})
export class TblProviderComponent implements OnInit {

  lsProvider: Ally[];
  //pagination
  p: number = 1;
  isAwaiting: boolean;

  constructor(private provideService: ProviderService) { }

  async ngOnInit() {
    this.isAwaiting = true;
    this.lsProvider = await this.provideService.getAllProvider();
    this.isAwaiting = false;
  }

 
  exportData(){
    let data = Ally.mapDataToExport(this.lsProvider);
    let contentCSV = SharedFunctions.prepareDataToCSV(data);
    SharedFunctions.downloadCSVFile(contentCSV,'RA_Proveedores');
  }

}
