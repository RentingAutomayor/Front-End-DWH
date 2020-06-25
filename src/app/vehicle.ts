import { Ally } from "./ally";
import { RouterEvent } from "@angular/router";

export class Vehicle {
    licensePlate: String;
    brand: String;
    model: String;
    year: String;
    chasisCode: String;
    engineCode: String;
    loadingCapacity: String;
    cylinder: String;
    clasification: String;
    color: String;
    passangerCapacity: String;
    serviceType: String;
    mileage: String;
    status: String;
    purchaseDate: Date;
    purchasePrice: number;
    accesoriesPrice: number;
    deliveredDate: Date;
    lastInspectionDate: Date;
    provider: Ally;
    contract:String;
    contratedMileage:number;

    static mapDataToExport(_lsVehicles:Vehicle[]):any{
        const data = _lsVehicles;
        const dataMap = data.map( row => ({
            placa: row.licensePlate,
            clasificacion: row.clasification,
            marca: row.brand,
            linea: row.model,
            modelo: row.year,
            codigo_chasis: row.chasisCode,
            codigo_motor: row.engineCode,
            capacidad_carga: row.loadingCapacity,
            cilindraje: row.cylinder,
            color: row.color,
            capacidad_pasajeros: row.passangerCapacity,
            tipo_de_servicio: row.serviceType,
            kilometraje:row.mileage,
            estado: row.status,
            fecha_de_compra: row.purchaseDate,
            precio_de_compra: row.purchasePrice,
            precio_de_accesorios: row.accesoriesPrice,
            fecha_de_entrega: row.deliveredDate,
            fecha_ultima_inspeccion: row.lastInspectionDate,
            proveedor: (row.provider.name +'' + Vehicle.validateNull(row.provider.lastName)).trim(),
            contrato: row.contract,
            kilometraje_contratado: row.contratedMileage
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