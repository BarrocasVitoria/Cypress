// .type() digitar
// cy.get() identifica os elementos com os quais queremos interagir ou fazer verificacoes
// .should() verifica se a mensagem esta sendo apresentada na tela
// . classe
// # id
// .only executar somente esse teste

///<reference types="Cypress" /> 

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() { //definir as condições que deseja executar antes de um conjunto de testes ou antes de cada teste. 
     cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
     cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
      cy.get('#firstName').type('Vitoria')
      cy.get('#lastName').type('Barrocas')
      cy.get('#email').type('vitoriabarrocasteste@gmail.com')
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.get('button[type="submit"]').click()

      cy.get('.success').should('be.visible') // mensagem de sucesso esta sendo realmente apresentada
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      cy.get('#firstName').type('Vitoria')
      cy.get('#lastName').type('Barrocas')
      cy.get('#email').type('vitoriabarrocasteste@gmail,com')
      cy.get('#open-text-area').type('teste')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor nao-numérico', function() {
      cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('#firstName').type('Vitoria')
      cy.get('#lastName').type('Barrocas')
      cy.get('#email').type('vitoriabarrocasteste@gmail.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('teste')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')

    })

    it.only('preenche e limpa os campos nome, sobrenome, email, area de texto e telefone', function(){
    cy.get('#firstName')
      .type('Vitoria')
      .should('have.value', 'Vitoria')
      .clear().should('have.value', '')
    cy.get('#lastName')
      .type('Barrocas')
      .should('have.value', 'Barrocas')
      .clear().should('have.value', '')
    cy.get('#email')
      .type('vitoriabarrocasteste@gmail.com')
      .should('have.value', 'vitoriabarrocasteste@gmail.com')
      .clear().should('have.value', '')
    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear().should('have.value', '')
    cy.get('#open-text-area')
      .type('teste')
      .should('have.value', 'teste')
      .clear().should('have.value', '')
    })
  })
  