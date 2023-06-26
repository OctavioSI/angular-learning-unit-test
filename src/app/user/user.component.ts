import { Component } from '@angular/core';
import { UserService } from './user.service';
import { UserModel } from './user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public userList: UserModel[] = [];
  public fetchedList: UserModel[] = [];
  public user: UserModel = {
    "name": "",
    "surname": ""
  };
  constructor(
    private service: UserService
  ) {

  }

  ngOnInit() {
    this.userList = this.service.getUsers();
    this.service.fetchUsersFromServer().then((data:UserModel[]) => {
      this.fetchedList = data;
    });
  }

  createUser() {
    this.service.addUser(this.user);
    this.userList = this.service.getUsers();
    this.user = {
      "name": "",
      "surname": ""
    };
  }

  removeUser(index: number) {
    this.service.removeUser(index);
    this.userList = this.service.getUsers();
  }

  getUser(index: number){
    this.user = this.service.getUser(index);
  }

}
