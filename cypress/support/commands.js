Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('de Castro Lima')
    cy.get('#email').type('casmei@protonmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})