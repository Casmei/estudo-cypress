/// <reference types="Cypress" />

describe(('Central de Atendimento ao Cliente TA'), () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', () => {
        cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Tiago')
        cy.get('#lastName').type('de Castro Lima')
        cy.get('#email').type('casmei@protonmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Deve exibir uma mensagem de erro ao preencher o e-mail incorretamente', () => {
        cy.get('#firstName').type('Tiago')
        cy.get('#lastName').type('de Castro Lima')
        cy.get('#email').type('email-errado.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio qunado preenchido com valor nao numerico', () => {
        cy.get('#phone')
            .type('asadasdsasdsa')
            .should('be.value', '')
    })


    it('Deve exibir uma mensagem de erro quando tornar o campo de telefone obrigatório mas n preencher ele', () => {
        cy.get('#firstName').type('Tiago')
        cy.get('#lastName').type('de Castro Lima')
        cy.get('#email').type('camsmei@protonmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Tiago')
            .should('have.value', 'Tiago')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('de Castro Lima')
            .should('have.value', 'de Castro Lima')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('camsmei@protonmail.com')
            .should('have.value', 'camsmei@protonmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type=radio][value=feedback]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type=radio]')
            .should('have.length', 3)
            .each((item) => {
                cy.wrap(item).check()
                cy.should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type=checkbox]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('selecione um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should((input) => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('selecione um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should((input) => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })


    it('selecione um arquivo utilizando uma fixture', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should((input) => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })


    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})