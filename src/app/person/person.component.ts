import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { KindOfDocumentService } from '../Services/kind-of-document.service';
import { kindOfDocument } from '../kindOfDocument';
/*
  Para el amnejo de formularios se pueden utilizar dos arquitecturas
  1. Reacive forms : permiten que el flujo de datos dentro del formulario y el modelo sea Sincrona
  2. Template-driven : los formularios guíados por plantilla son Asincronos y son más dificiles que sean escalables.

  Para el manejo de los formularios reactivos se debe importar primero la libreria en el app.module.ts y posteriormente
  se debe importar en este archivo.

  Si se requiere trabajar con un grupo de campos se debe importar tambien FormGroup
*/

import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { PersonService } from '../Services/person.service';
import { Person } from '../person';

import { CityService } from '../Services/city.service';
import { City } from '../city';

import { Client } from '../client';
import { ClientService } from '../Services/client.service';

/*Para que sirva los pipes de observables se deben importar alkgunas librerias */
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EconomicActivity } from '../EconomicActivity';
import { EconomicActivityService } from '../Services/economic-activity.service';
import { Contact } from '../contact';
import { Canal } from '../canal';
import { CanalService } from '../Services/canal.service';
import { ResponseApi } from '../responseApi';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  kindOfDocuments: kindOfDocument[];
  // Aqui comensamos a declarar los controles de nuestro componente
  formPerson: FormGroup;
  isNaturalPerson: boolean;
  lblNameDescription: string;
  objPerson: Person;
  formPersonWasFinished: boolean;
  @Input() kindOfForm: string;
  isLsClient: boolean;
  isTxtDocumentActive: boolean;
  isTxtNameActive: boolean;
  lsClient$: Observable<Client[]>;
  oSelectedCity: City;
  oSelectedEconomicActivity: EconomicActivity;
  oSelectedCanal: Canal;
  private description = new Subject<string>();
  @Output() ClientSetted = new EventEmitter<Client>();
  @Output() frmPersonIsFinished = new EventEmitter<boolean>();
  lsContacts: Contact[];
  isClientForm: boolean;
  clientExists: boolean;
  oEconomicActSelected: EconomicActivity;
  oCanalSelected: Canal;
  @Input() frmClientBack: boolean;
  validationForm:ResponseApi;
  frmHasErrors:boolean;
  oClientDB: Client;

  constructor(
    private kindOfDocsService: KindOfDocumentService,
    private userService: UserService,
    private personService: PersonService,
    private cityService: CityService,
    private clientService: ClientService,
    private economicActivityService: EconomicActivityService,
    private canalService: CanalService
  ) {
    this.formPerson = new FormGroup({
      cmboKindOfDocument: new FormControl('Seleccione ...'),
      txtDocument: new FormControl(''),
      txtName: new FormControl(''),
      txtLastName: new FormControl(''),
      txtCellPhone: new FormControl(''),
      txtEmail: new FormControl('')

    });

  }

  ngOnInit() {
    this.getKindOfDocuments();
    this.isNaturalPerson = true;
    this.lblNameDescription = "Nombres";
    this.objPerson = new Person();
    this.isLsClient = false;
    this.isTxtDocumentActive = false;
    this.isTxtNameActive = false;
    this.isClientForm = false;
    this.clientExists = false;
    this.frmHasErrors = false;


    if (this.kindOfForm == "client") {
      this.isLsClient = true;
      this.isClientForm = true;
      console.log("Busqueda sobre clientes activadas ... ");
      this.lsClient$ = this.description.pipe(
        //Espera 300 ms despues de cada tecleo
        debounceTime(300),
        //Ignora un termino si es igual al anterior
        distinctUntilChanged(),
        //cambia a una busqueda de tipo Observable
        //switchMap((desc:string) => this.clie.getJobTitlesByDescription(desc)),
        switchMap((desc: string) => this.clientService.getClientsByDescriptions(desc)),
      );


      if (this.frmClientBack) {


        let clientTmp = new Client();
        clientTmp = this.clientService.getClientTmp();
        console.log("Cliente temporal");
        console.log(clientTmp);
        this.oSelectedCity = clientTmp.city;
        this.oSelectedEconomicActivity = clientTmp.economicActivity;
        this.oCanalSelected = clientTmp.canal;
        this.setDataClientToForm(clientTmp);
      }
    }
  }

  getKindOfDocuments(): void {
    this.kindOfDocsService.getKindOfDocuments().subscribe(kod => this.kindOfDocuments = kod);
  }

  validateKindOfPerson(obj: any): void {
    let kindOfDocSel = this.kindOfDocuments.find(kod => kod.id == obj.value);
    console.log(kindOfDocSel.description);
    if (kindOfDocSel.description.toUpperCase() == "NIT") {
      this.isNaturalPerson = false;
      this.lblNameDescription = "Razón social";
    } else {
      this.isNaturalPerson = true;
      this.lblNameDescription = "Nombres";
    }

    this.personService.setIsNaturalPerson(this.isNaturalPerson);
  }

  searchPerson(desc: string) {
    let aDesc = desc.split('|');
    if (aDesc[0] == 'id') {
      this.isTxtDocumentActive = true;
      this.isTxtNameActive = false;
    } else if (aDesc[0] == 'name') {
      this.isTxtDocumentActive = false;
      this.isTxtNameActive = true;
    }
    this.description.next(desc);
  }

  setDataClientToForm(pClient: Client) {
    console.log("[Cliente posteado en el formulario]");
    console.log(pClient);

    this.oClientDB = pClient;

    this.isTxtDocumentActive = false;
    this.isTxtNameActive = false;

    this.formPerson.controls.cmboKindOfDocument.setValue(pClient.kindOfDocument.id);
    this.formPerson.controls.txtDocument.setValue(pClient.document);
    this.formPerson.controls.txtName.setValue(pClient.name);
    this.formPerson.controls.txtLastName.setValue(pClient.lastName);
    this.formPerson.controls.txtEmail.setValue(pClient.email);
    this.formPerson.controls.txtCellPhone.setValue(pClient.cellPhone);

    if (pClient.kindOfDocument.description.toUpperCase() == 'NIT') {
      this.isNaturalPerson = false;
      this.formPerson.controls.txtLastName.setValue("");
      this.formPerson.controls.txtEmail.setValue("");
      this.formPerson.controls.txtCellPhone.setValue("");
    } else {
      this.isNaturalPerson = true;
    }

    this.oSelectedCity = pClient.city;
    this.cityService.setSelectedCity(pClient.city);
    this.oEconomicActSelected = pClient.economicActivity;
    this.economicActivityService.setEconomicActivity(pClient.economicActivity);
    this.oCanalSelected = pClient.canal;
    this.canalService.setSelectedCanal(pClient.canal);
    this.ClientSetted.emit(pClient);


    console.log(this.lsContacts);

  }

  setPerson() {
    console.log("[Formulario tipo]: " + this.kindOfForm);

    let objCity: City;
    let oKindOfDocument: kindOfDocument;
    console.log(this.formPerson.controls.cmboKindOfDocument.value);
    oKindOfDocument = this.kindOfDocuments.find(kod => kod.id == this.formPerson.controls.cmboKindOfDocument.value);
    console.warn(oKindOfDocument);
    objCity = this.cityService.getSelectedCity();
    //console.warn(this.formPerson.value);
    let id = this.formPerson.controls.txtDocument.value;
    if (oKindOfDocument != undefined) {
      let kindOfDoc = oKindOfDocument;
      let name = this.formPerson.controls.txtName.value;

      let lastName = "";
      let cellPhone = "";
      let email = "";

      if (oKindOfDocument.description.toUpperCase() != 'NIT') {
        lastName = this.formPerson.controls.txtLastName.value;
        cellPhone = this.formPerson.controls.txtCellPhone.value;
        email = this.formPerson.controls.txtEmail.value;
      }


      //console.log(objCity);

      this.objPerson.document = id;
      this.objPerson.kindOfDocument = kindOfDoc;
      this.objPerson.name = name;
      this.objPerson.lastName = lastName;
      this.objPerson.cellPhone = cellPhone;
      this.objPerson.email = email;
      this.objPerson.city = objCity;


      this.validationForm = this.personService.validateFormPerson(this.objPerson);

      if (this.validationForm.response) {
        this.personService.setPerson(this.objPerson);

        console.log("[Se crea el objeto persona:]");
        console.log(this.objPerson);

        if (this.kindOfForm == "client") {
          let oEconomicActivity = this.economicActivityService.getEconomicActivity();
          let oCanal = this.canalService.getSelectedCanal();

          let oClient = new Client();
          oClient.setClient(this.objPerson, oEconomicActivity, oCanal);         
          console.warn("[Lista de contactors]");
          console.log(oClient.lsContacts);
          this.clientService.setClientTmp(oClient);
          console.warn("[Cliente send to contact]")
          console.log(oClient);

          if(this.oClientDB != undefined){
            console.log("[Objeto BD]");
            console.warn(this.oClientDB);
            console.log("[Objeto Formulario]");
            console.warn(oClient);   
            let isModified = false;
            if(this.oClientDB.name != oClient.name){
              console.log("El nombre del cliente ha sido modificado");
              isModified = true;
            }else if(this.oClientDB.lastName != oClient.lastName){
              console.log("El apellido del cliente ha sido modificado");
              isModified = true;
            }else if(this.oClientDB.cellPhone != oClient.cellPhone){
              console.log("El celular del cliente ha sido modificado");
              isModified = true;
            }else if(this.oClientDB.email != oClient.email){
              console.log("El email del cliente ha sido modificado");
              isModified = true;
            }else if(this.oClientDB.city.id != oClient.city.id){
              console.log("La ciudad del cliente ha sido modificado");
              isModified = true;
            }else if(this.oClientDB.economicActivity.id != oClient.economicActivity.id){
              console.log("La actividad económica del cliente ha sido modificado");
              isModified = true;
            }else if(this.oClientDB.canal.id != oClient.canal.id){
              console.log("El canal del cliente ha sido modificado");
              isModified = true;
            }else if(this.oClientDB.lsContacts == null){     
              console.log("verificar actualización de contactos");
              isModified = true;
            }else if(this.oClientDB.lsContacts != null){     
              console.log("verificar actualización de contactos");
              isModified = true;
            }

            this.clientService.setClientWasModified(isModified);
          }
        }
        this.frmHasErrors = false;

        this.frmPersonIsFinished.emit(true);
      } else {
        alert("El formulario ingresado no es válido.");
        console.log( this.validationForm.message);
        this.frmHasErrors = true;
      }
    }else{
      alert("Debe seleccionar un tipo de documento");
    }
  }


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.warn(changes);
    for (let propName in changes) {
      //let changedProp = changes[propName];
      //let slCity;

    }
  }

}
