import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-tbl-users',
  templateUrl: './tbl-users.component.html',
  styleUrls: ['./tbl-users.component.scss']
})
export class TblUsersComponent implements OnInit {
  lsUser: User[];
  //pagination
  p: number = 1;
  isAwaiting : boolean;

  constructor(private userService: UserService ) { }

  async ngOnInit() {
    this.isAwaiting = true;
    this.lsUser = await this.userService.getUsers();
    this.isAwaiting = false;
  }

}
