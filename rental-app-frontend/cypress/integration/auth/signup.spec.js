/// <reference types="cypress" />
import Chance from 'chance'

const url = Cypress.env('url')
const existingEmail = Cypress.env('email')
const existingUsername = Cypress.env('username')
const existingPassword = Cypress.env('password')

const chance = new Chance()

context('Sign up', () => {

    before(() => {
        cy.visit(`${url}/signup`)
    })

    it('sign up fail, bad input', () => {

        cy.contains('Sign Up')
        cy.get('#email').clear().type('bademail')
        cy.get('#username').clear().type('username')
        cy.get('#password').clear().type('pass')
        cy.get('#password_confirm').clear().type('pass')
        cy.get('button').contains('Sign Up').click()

        cy.contains('Please enter a valid e-mail address')
    })

    it('sign up fail, existing email', () => {

        cy.contains('Sign Up')
        cy.get('#email').clear().type(existingEmail)
        cy.get('#username').clear().type('notexistinguser')
        cy.get('#password').clear().type(existingPassword)
        cy.get('#password_confirm').clear().type(existingPassword)
        cy.get('button').contains('Sign Up').click()

        cy.contains('Email must be unique')
    })

    it('sign up fail, existing username', () => {

        cy.contains('Sign Up')
        cy.get('#email').clear().type('noemail@gmail.com')
        cy.get('#username').clear().type(existingUsername)
        cy.get('#password').clear().type(existingPassword)
        cy.get('#password_confirm').clear().type(existingPassword)
        cy.get('button').contains('Sign Up').click()

        cy.contains('Username must be unique')
    })

    it('sign up fail, password not strong enough', () => {

        cy.contains('Sign Up')
        cy.get('#email').clear().type('noemail@gmail.com')
        cy.get('#username').clear().type('notexistinguser')
        cy.get('#password').clear().type('weakpass')
        cy.get('#password_confirm').clear().type('weakpass')
        cy.get('button').contains('Sign Up').click()

        cy.contains('Password must be at least 7 characters long, contain at least one upper case and two digits!')
    })

    it('sign up success', () => {
        cy.contains('Sign Up')
        cy.get('#email').clear().type(chance.email())
        cy.get('#username').clear().type(chance.string())
        cy.get('#password').clear().type('asdASD123')
        cy.get('#password_confirm').clear().type('asdASD123')
        cy.get('button').contains('Sign Up').click()

        cy.contains('You have successfully registered')
    })
})