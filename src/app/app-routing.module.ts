import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TblRequestsComponent } from './tbl-requests/tbl-requests.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { RequestRiskComponent } from './request-risk/request-risk.component';
import { RequestOperationComponent } from './request-operation/request-operation.component';
import { LoginComponent } from './login/login.component';
import { RequestReviewComponent } from './request-review/request-review.component';
import { UpdateRequestComponent } from './update-request/update-request.component';
import { TblClientsComponent } from './tbl-clients/tbl-clients.component';
import { TblProviderComponent } from './tbl-provider/tbl-provider.component';
import { TblVehiclesComponent } from './tbl-vehicles/tbl-vehicles.component';
import { TblContractsComponent } from './tbl-contracts/tbl-contracts.component';
import { TblUsersComponent } from './tbl-users/tbl-users.component';
import { TblRolesComponent } from './tbl-roles/tbl-roles.component';

const routes: Routes = [
  { path: 'MasterRequests', component: TblRequestsComponent },
  { path: 'NewRequest', component: AddRequestComponent},
  { path: 'UpdateRiskInformation',component: RequestRiskComponent },
  { path: 'UpdateOperationalInformation',component:RequestOperationComponent},
  { path: 'Login', component:LoginComponent },
  { path: 'RequestReview', component:RequestReviewComponent},
  { path: 'UpdateRequest', component:UpdateRequestComponent},
  { path: 'MasterClients', component:TblClientsComponent },
  { path: 'MasterProvider', component:TblProviderComponent },
  { path: 'MasterVehicles', component:TblVehiclesComponent }, 
  { path: 'MasterContracts', component:TblContractsComponent }, 
  { path: 'MasterUsers' , component: TblUsersComponent },
  { path: 'MasterRoles' , component: TblRolesComponent },
  { path: '',   redirectTo: '/Login', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
