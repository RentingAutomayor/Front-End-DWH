import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Contract } from '../contract';
import { ContractService } from '../Services/contract.service';
import { SharedFunctions } from '../shared/sharedFunctions';

@Component({
  selector: 'app-tbl-contracts',
  templateUrl: './tbl-contracts.component.html',
  styleUrls: ['./tbl-contracts.component.scss']
})
export class TblContractsComponent implements OnInit {
  lsContract: Contract[];
  //pagination
  p: number = 1;
  isAwaiting: boolean;
  constructor(
    private contractService: ContractService
  ) { }

  async ngOnInit() {
    this.isAwaiting = true;
    this.lsContract = await this.contractService.getAllContracts();
    this.isAwaiting = false;
  }

  exportData(){
    let data = Contract.mapDataToExport(this.lsContract);
    let contentCSV = SharedFunctions.prepareDataToCSV(data);
    SharedFunctions.downloadCSVFile(contentCSV,'RA_Contratos');
  }


}
