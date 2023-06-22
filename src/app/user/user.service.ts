import { Injectable } from '@angular/core';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userList: UserModel[] = [];

  getUsers(){
    return this.userList;
  }

  getUser(index: number){
    return this.userList[index];
  }

  addUser(user: UserModel){
    this.userList.push(user);
  }

  removeUser(index: number){
    this.userList.splice(index, 1);
  }

  constructor() { }
}
