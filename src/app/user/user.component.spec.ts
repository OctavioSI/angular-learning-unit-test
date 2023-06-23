import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser"; // necessário para usar o By.css
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule], // Importamos o FormsModule para conseguir usar directives como o ngModel
      declarations: [UserComponent]
    });
    // Antes de cada teste, instanciamos o componente e colocamos o detectChanges() para funcionar
    // como no navegador
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
  });

  // Criado automaticamente: garante que o componente existe
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Abaixo vamos criar os nossos testes efetivamente
   */
  it("deve chamar a listagem de usuarios do service", () => {
    const userService = fixture.debugElement.injector.get(UserService);
    expect(userService.getUsers()).toEqual(component.userList);
  });

  it("deve criar um novo usuario no serviço e verifica se foi impresso na tela", () => {
    // Aqui incluímos um usuário na userList do service
    const userService = fixture.debugElement.injector.get(UserService);
    component.user = {
      "name":"João",
      "surname": "das Couves"
    };
    userService.addUser(component.user);
    // quando o componente é iniciado, ele chama o ngOnInit, que atribui
    // o seguinte:  this.userList = this.service.getUsers();
    fixture.detectChanges(); // o detectChanges() simula a execução da instância no navegador, passando a renderizá-lo
    // Aqui buscamos o "conteúdo" do nosso componente renderizado
    const compiled = fixture.debugElement.nativeElement;
    // E se encontrarmos o name e surname concatenados dentro do texto,
    // nossa condição será verdadeira e o teste será válido.
    //
    // No user.component.html temos o trecho que faz essa concatenação:
    // <div class="card-body">
    //    <h6>{{ usr.name }} {{ usr.surname }}</h6>
    // </div>
    expect(compiled.innerHTML).toContain("João das Couves");
  });

  it("o botão de criar um novo usuario deve estar desabilitado se o nome ou sobrenome estiverem vazios", () => {
    fixture.detectChanges();
    // usando o By.css conseguimos selecionar um elemento dessa forma.
    // A partir daí podemos proceder à verificação do elemento.
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it("se o nome e sobrenome estiverem preenchidos, o botão de criar um novo usuario deve estar habilitado", () => {
    component.user = {
      "name": "Maria",
      "surname": "das Neves"
    };
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it("deve remover um usuario quando clicar no botão", () => {
    const userService = fixture.debugElement.injector.get(UserService);
    component.user = {
      "name": "João",
      "surname": "Melão"
    };
    // Primeiro adicionamos o usuário na lista, como fizemos no teste anterior
    userService.addUser(component.user);
    fixture.detectChanges();
    // Vamos verificar se o nome está na página antes de tudo:
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain("João Melão");
    /** Vamos buscar o elemento que faz o clique efetivamente buscando
     * em nossa instância o elemento que é composto por um elemento de classe .row
     * e dentro dele um elemento .card
     *
     * O elemento que procuramos é este aqui:
     *
     *  <div class="row">
     *    <div class="card mb-3 col-5 list-card" id="user-cards" style="max-width: 18rem;" *ngFor="let usr of userList; let i = index" (click)="removeUser(i)">
     *        <div class="card-body">
     *            <h6>{{ usr.name }} {{ usr.surname }}</h6>
     *        </div>
     *    </div>
     *  </div>
     *
     * Para simular o clique no botão, usamos o .triggerEventHandler("click", null)
     * cuja documentação pode ser vista aqui: https://angular.io/api/core/DebugElement#triggereventhandler
     * Usamos o By.css para achar o elemento que tem esse clique único ali na tela. Poderíamos
     * buscar com .query(By.css("#user-cards")) que é o id da linha que receberá o clique
     * ou com .query(By.css(".list-card")) que é a classe dessa linha
     */
    fixture.debugElement
      .query(By.css(".list-card"))
      .triggerEventHandler("click", null);
    fixture.detectChanges();
    // Após clicar no botão, ele deve remover o elemento da lista já que o clique chama a função removeUser()
    // Se foi removido, não deveria mais aparecer o nome na Lista
    expect(compiled.innerHTML).not.toContain("João Melão");
  });

});
