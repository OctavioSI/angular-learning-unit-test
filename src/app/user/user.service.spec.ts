/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { UserModel } from './user-model';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  // Criado automaticamente: antes de cada teste, o serviço é "injetado"
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  // Criado automaticamente: verifica se a instância do service "injetado" está presente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Abaixo vamos criar os nossos testes efetivamente
   */
  it("deve inserir um usuario na lista", () => {
    let newuser: UserModel = {
      "name": "José",
      "surname": "Silva"
    };
    service.addUser(newuser);
    expect(service.userList.length).toBeGreaterThanOrEqual(1);
  });

  it("deve inserir e logo após remover um usuario na lista", () => {
    let newuser: UserModel = {
      "name": "José",
      "surname": "Silva"
    };
    service.addUser(newuser);
    service.removeUser(0);
    expect(service.userList.length).toBeLessThan(1);
  });

});
