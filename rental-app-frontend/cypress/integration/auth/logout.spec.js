/// <reference types="cypress" />

// const url = process.env.VUE_APP_SITE_URL
const url = Cypress.env('url')
const email = Cypress.env('email')
const password = Cypress.env('password')

context('Log out', () => {

    before(() => {
        cy.visit(`${url}/login`)
    })

    it('should log in', () => {
        cy.login(email, password)
    })

    it('should log out', () => {
        cy.get('a').contains('LOGOUT').click()
        cy.get('#myTopnav').should('not.contain', 'DAHSBOARD')
    })
})