/// <reference types="cypress" />

// const url = process.env.VUE_APP_SITE_URL
const url = Cypress.env('url')

context('Privileges', () => {

    it('should redirect to login page', () => {
        cy.visit(`${url}/dashboard`)
        cy.contains('Log In')
    })
})