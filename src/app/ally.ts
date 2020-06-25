import { kindOfDocument } from "./kindOfDocument";

export class Ally{
    document:string;
    kindOfDocument:kindOfDocument;
    name:string;
    lastName:string;
    percentCommission:number;
    registrationDate:Date;

    static mapDataToExport(_lsAlly:Ally[]):any{
        console.log("Ingresa a la función de mapeo");
        const data = _lsAlly;
        const dataMap = data.map(row => ({
            documento: row.document,
            nombre: (row.name + '' + Ally.validateNull(row.lastName)).trim()
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