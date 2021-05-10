import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../Services/client.service'
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedFunctions } from '../shared/sharedFunctions';
import { Contact } from '../contact';


@Component({
  selector: 'app-tbl-clients',
  templateUrl: './tbl-clients.component.html',
  styleUrls: ['./tbl-clients.component.scss']
})
export class TblClientsComponent implements OnInit {
  lsClient : Client[];
  lsoFContacts: Contact[];
   //pagination
   p:number = 1;
   //
   isAwaiting:boolean;
  constructor(
    private clientService: ClientService
  ) {
    this.lsoFContacts = [];
   }

  async ngOnInit() {
    this.isAwaiting = true;
    this.lsClient = await this.clientService.getAllClients();
    console.log(this.lsClient);
    this.isAwaiting = false;
   
  }

  async getContactsByClient(idClient:string){  
    this.lsoFContacts = await this.clientService.getContactsByClient(idClient);  
  }

  exportData(){
    let data = Client.mapDataToExport(this.lsClient);
    let contentCSV = SharedFunctions.prepareDataToCSV(data);
    SharedFunctions.downloadCSVFile(contentCSV,'RA_Clientes');
  }

}
