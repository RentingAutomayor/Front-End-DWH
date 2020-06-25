import { City } from "./city";
import { kindOfDocument } from "./kindOfDocument";

export class Person{
    document:string;
    kindOfDocument:kindOfDocument;
    name:string;
    lastName:string;
    cellPhone:string;
    email:string;
    city:City;

    constructor(){}

}