/// <reference types="Cypress" />

describe(('Central de Atendimento ao Cliente TA'), () => {
    beforeEach(() => {
        cy.visit('./src/privacy.html')
    })

    it('Verifica o título da aplicação', () => {
        cy.contains('Talking About Testing').should('be.visible')
    })
})