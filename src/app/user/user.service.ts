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
  // Esta função abaixo tem apenas o objetivo de simular
  // a obtenção de uma lista de registros (no caso, apenas 1)
  // do servidor. Ele aguarda 2 segundos e devolve a lista.
  //
  // Em um caso real, colocamos aqui a nossa função com a
  // comunicação externa como deve ser.
  fetchUsersFromServer(): Promise<UserModel[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([new UserModel("Johnny", "Depp")]);
      }, 2000);
    });
  }

  constructor() { }
}
