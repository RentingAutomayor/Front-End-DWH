import { Client } from "./client";

export class Contract {
    id: String;
    description: String;
    client: Client;
    actCode: String;
    startDate: Date;
    endingDate: Date;
    renovationDate: Date;
    signatureDate: Date;
    state: String;

    static mapDataToExport (_lsContract:Contract[]):any{
        const data = _lsContract;
        const dataMap = data.map(row => ({
            codigo: row.id,
            descripcion: row.description,
            cliente: (row.client.name + ' '+ Contract.validateNull(row.client.lastName)).trim(),
            codigo_acta: row.actCode,
            fecha_inicio: row.startDate,
            fecha_terminacion: row.endingDate,
            fecha_renovacion: row.renovationDate,
            fecha_firma: row.signatureDate,
            estado: row.state 
        }));
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