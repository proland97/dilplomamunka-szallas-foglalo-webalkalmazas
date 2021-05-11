/// <reference types="cypress" />

const url = Cypress.env('url')
const email = Cypress.env('email')
const password = Cypress.env('password')

context('Log in', () => {

    before(() => {
        cy.visit(`${url}/login`)
    })

    it('should not log in, bad format', () => {

        cy.contains('Log In')

        cy.get('#email').clear().type('notvalidemail')
        cy.get('#password').clear().type('notvalidemail')
        cy.get('button').contains('Log In').click()
        cy.contains('Please enter a valid e-mail address')
        cy.contains('Log In')
    })

    it('should not log in, username or password is wrong', () => {

        cy.contains('Log In')

        cy.get('#email').clear().type('validmail@gmail.com')
        cy.get('#password').clear().type('ValidPass12')
        cy.get('button').contains('Log In').click()
        cy.contains('Email or password is wrong')
        cy.contains('Log In')
    })

    it('should log in', () => {

        cy.contains('Log In')

        cy.get('#email').clear().type(email)
        cy.get('#password').clear().type(password)
        cy.get('button').contains('Log In').click()
        cy.contains('DASHBOARD')
    })
})