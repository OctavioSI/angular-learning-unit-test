/**
 * # INTRODUÇÃO
 *
 * Farei aqui os comentários ao teste padrão gerado pela aplicação Angular, para entendermos como
 * o Angular organiza e utiliza os testes.
 *
 * Como padrão, o Angular utiliza o Karma (https://karma-runner.github.io/latest/index.html) como ferramenta
 * de testes e o Jasmine (https://jasmine.github.io/tutorials/your_first_suite) como framework.
 *
 *
 *
 * # O BÁSICO DA SINTAXE DO JASMINE
 *
 * Para construir os nossos testes, precisaremos usar a sintaxe do Jasmine. Um ótimo ponto de partida
 * para entender como construir os seus teste é ler a própria documentação do Jasmine que tem um tutorial sobre
 * o seu funcionamento básico: https://jasmine.github.io/tutorials/your_first_suite
 *
 * O Jasmine utiliza 2 funções básicas para organização: o "describe" e o "it". As duas são funções em JavaScript
 * que recebem uma 'string' com um nome (que serve para organizar e buscar de forma fácil depois o que está sendo
 * testado) e uma função (function). Como ambas são funções JavaScript, eles podem receber qualquer código
 * JavaScript dentro da função necessárias para que o teste seja conduzido.
 *
 *
 * ## Funções "describe" e "it"
 *
 * O "describe" serve como um agrupador de testes, sendo que cada arquivo de teste tem um "describe" principal
 * (no nível mais alto). Funções "describe" podem conter outras funções "describe".
 *
 * O "it" contém o teste efetivo, e tem uma "expectativa" (expect) que deve ser verdadeira (true) ou falsa (false).
 * Se o teste retorna uma expectativa falsa, entende-se que o teste falhou.
 *
 *
 * ## O "expect" e os "matchers"
 *
 * O "expect" é uma função também, que recebe um valor que será o objeto da nossa verificação.
 * Por exemplo, no código abaixo:
 *
 *     describe("Nosso teste eh uma funcao", function() {
 *       let a;
 *       it("e o teste eh uma funcao tb", function() {
 *         a = true;
 *         expect(a).toBe(true);
 *       });
 *     });
 *
 * O teste acima deve passar -- definimos uma variável como verdadeira e em nosso teste esperamos
 * que a variavel "a" [ expect(a) ] deve ser verdadeira [ .toBe(true) ].
 *
 * Essa verificação "toBe" é o que o Jasmine define como "matcher" e tem o papel de reportar ao Jasmine
 * se a expectativa (expect) é verdadeira ou falsa. Você pode criar uma verificação negativa colocando
 * antes do matcher um ".not", como abaixo:
 *
 *       it("aqui uma verificacao negativa", function() {
 *          expect(false).not.toBe(true);
 *       });
 *
 * Uma lista dos matchers disponíveis no Jasmine pode ser encontrada aqui: https://jasmine.github.io/api/edge/matchers.html
 * Você também pode definir matchers customizados se necessário: https://jasmine.github.io/tutorials/custom_matcher.html
 *
 *
 * ## Funções especiais
 *
 * Além do agrupador "describe" e do teste "it", o Jasmine traz ainda funções especiais:
 * - beforeEach // roda antes de cada teste "it" existente no escopo do "describe"
 * - afterEach  // roda após cada teste "it" existente no escopo do "describe"
 * - beforeAll // roda apenas uma vez, antes de todos os testes "it" existentes no escopo do "describe"
 * - afterAll // roda apenas uma vez, após todos os testes "it" existentes no escopo do "describe"
 *
 * Você pode chamar as funções do beforeEach, afterEach, beforeAll, afterAll e o "it" de forma assíncrona:
 *
 *      describe("teste assincrono", function() {
 *          beforeEach(async function() {
 *              await somethingSlow();
 *          }, 1000);
 *      });
 *
 * Podemos ainda fazer com que uma função falhe o teste manualmente usando o "fail":
 *
 *      describe("A spec using the fail function", function() {
 *        it("should not call the callBack", function() {
 *          fail("Callback has been called");
 *        });
 *      });
 *
 * ## Suspender ou Focar um teste
 *
 * Durante o teste, podemos ainda não rodar um teste (it) ou grupo (describe) colocando um "x" na frente,
 * ficando como "xit" ou "xdescribe", e teremos o seguinte resultado:
 *
 *      3 specs, 0 failures, 1 pending spec, randomized with seed 34017
 *      AppComponent
 *      should create the app
 *      should render title
 *      should have as title 'angular-learning-unit-test' PENDING WITH MESSAGE: Temporarily disabled with xit
 *
 * Da mesma forma, podemos "focar" apenas o que queremos usando um "f" de "focar" an frente, ficando "fit" ou "fdescribe":
 *
 *      Ran 1 of 3 specs - run all
 *      Incomplete: fit() or fdescribe() was found, 1 spec, 0 failures, randomized with seed 86135
 *      AppComponent
 *      should have as title 'angular-learning-unit-test'
 *      should render title
 *      should create the app
 *
 * Se houver um "fit", os outros testes ("it" ou "xit") são ignorados.
 *
 * ## Espiões (Spies)
 *
 * No Jasmine é possível ainda criar um "spy" (espião) que nada mais é que uma função que possibilita
 * rastrear chamadas de uma função. Existem basicamente dois tipo de spy:
 *
 * (i) SpyOn(): permite que você rastreie o que uma função definida no código faz
 *
 *      describe("Aqui vai o spy", function() {
 *          let foo;
 *          let bar = null;
 *          beforeEach(function() {
 *              foo = {
 *                  setBar: function(value) {
 *                      bar = value;
 *                  }
 *              };
 *              spyOn(foo, 'setBar'); // coloca um spy na função "setBar" da instância "foo"
 *              foo.setBar(123); // aqui chamamos a função da instância "foo"
 *              foo.setBar(456, 'another param'); // Chamamos novamente a função "setBar" da instância "foo"
 *          });
 *
 *          it("Checa se a função da instância foo foi chamada", function() {
 *              expect(foo.setBar).toHaveBeenCalled(); // esse matcher vê se a função foi chamada a partir do spy
 *          });
 *     });
 *
 * (ii) jasmine.createSpy(): Se não houver uma função para fazer o spy, você pode criar um "mock" da
 * função criando um spy sem a correspondente implementação
 *
 *     describe("Aqui um exemplo de spy sem implementação correspondente", function() {
 *         let getName: any;
 *             it("Aqui vai o spy mockado", function() {
 *             getName = jasmine.createSpy("Name spy");
 *             getName();
 *             expect(getName).toHaveBeenCalled();
 *         });
 *     });
 *
 * Você ainda pode criar múltiplos spies usando o jasmine.createSpyObj():
 *
 *     describe("Multiplos spies criados manualmente como se fosse varias funcoes", function() {
 *         let tape;
 *         beforeEach(function() {
 *             tape = jasmine.createSpyObj(
 *                 'tape',
 *                 ['play', 'pause', 'stop', 'rewind']
 *             );
 *             tape.play();
 *             tape.pause();
 *             tape.rewind(0);
 *         });
 *
 *         it("Verifica se cada spy manual foi criado mesmo", function() {
 *             expect(tape.play).toBeDefined();
 *             expect(tape.pause).toBeDefined();
 *             expect(tape.stop).toBeDefined();
 *             expect(tape.rewind).toBeDefined();
 *         });
 *     });
 *
 * Como mencionado anteriormente, você pode encontrar a lista de matchers disponíveis no Jasmine
 * no seguinte endereço: https://jasmine.github.io/api/edge/matchers.html
 *
 *
 *
 * # O Jasmine na aplicação Angular
 *
 * Agora que temos uma noção de como a base da sintaxe do Jasmine funciona, vamos ver o que o Angular
 * nos trouxe. Se você olhar este arquivo que foi gerado pelo Angular, verá que ele usa o TestBed.
 *
 * O TestBed é a aplicação principal disponibilizada pelo Angular para viabilizar testes unitários.
 * Você encontra a documentação do TestBed aqui: https://angular.io/api/core/testing/TestBed
 *
 * Se olharmos o código de teste gerado pelo Angular, veremos ainda que foi criado o container "describe" com os
 * blocos "beforeEach" os testes "it".
 *
 * Como vimos o "beforeEach" roda antes de cada teste "it".
 *
 * Vamos analisar agora o código com comentários em cada um dos blocos e linhas relevantes abaixo:
 */

import { TestBed } from '@angular/core/testing'; // TestBed é a aplicação que possibilita testes unitários no Angular
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  /**
   * Este bloco "beforeEach" roda antes dos demais "it".
   * Nas declarations está o AppComponent, que é o componente principal que será testado.
   */
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent]
  }));
  /**
   * A seguir, o Angular cria um primeiro teste que consiste em verificar se o componente foi criado
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // define-se o componente a ser criado
    const app = fixture.componentInstance; // cria uma instância do componente
    expect(app).toBeTruthy(); // verifica se o componente foi realmente criado ou não com o "toBeTruthy"
  });

  /**
   * Agora, vemos se o componente possui uma propriedade "title" com o valor "angular-learning-unit-test".
   */
  it(`should have as title 'angular-learning-unit-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-learning-unit-test'); // verificando a propriedade "title"
  });

  /**
   * Este teste mostra o teste como se fosse no ambiente do navegador.
   */
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent); // Define o componente a ser criado
    fixture.detectChanges(); // o detectChanges() simula a execuação da instância no navegador, passando a renderizá-lo
    const compiled = fixture.nativeElement as HTMLElement;  // com o nativeElement acessamos o objeto renderizado
    // Finalmente, na última linha buscamos em elemento que tem a classe content, acessando o elemento span dele,
    // verificando se o conteúdo contém o texto com o nome do title e a frase que foi definida.
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-learning-unit-test app is running!');
    // Se olharmos o arquivo app.component.html, veremos que o trecho em questão está assim:
    /**
        <div class="content" role="main">
            [-- outras coisas aqui --]
            <span>{{ title }} app is running!</span>
            [-- outras coisas aqui --]
        </div>
    *
    */
  });

});
