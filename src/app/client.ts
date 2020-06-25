import { Person } from './person';
import { EconomicActivity } from './EconomicActivity';
import { Canal } from './canal';
import { Contact } from './contact';
import { readWorkspace } from '@angular-devkit/core/src/workspace';

export class Client extends Person{
    economicActivity:EconomicActivity;
    canal:Canal;
    lsContacts:Contact[];

    setClient(paramPerson:Person,paramEconAct:EconomicActivity,paramCanal:Canal){
        this.document = paramPerson.document;
        this.kindOfDocument = paramPerson.kindOfDocument;
        this.name = paramPerson.name;
        this.lastName = paramPerson.lastName;       
        this.cellPhone = paramPerson.cellPhone;
        this.email = paramPerson.email;
        this.city = paramPerson.city;
        this.economicActivity = paramEconAct;
        this.canal = paramCanal;
    }

    static mapDataToExport(_lsClient:Client[]):any{
       console.log("Ingresa a la función de mapeo")
       const data = _lsClient;
       const dataMap = data.map(row => ({
        documento: row.document,        
        nombre: (row.name + ' ' + Client.validateNull(row.lastName)).trim(),
        ciudad: row.city.name,
        actividad_economica: (Client.validateNull(row.economicActivity.description)).trim()
       }));

       console.log(dataMap);

        return dataMap;
    }
    static validateNull(info:string):string{
        if(info == null){
            return '';
        }else{
            return info;
        }
       
    }

    
}