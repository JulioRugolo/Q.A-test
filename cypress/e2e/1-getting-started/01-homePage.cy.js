/// <reference types="cypress" />

describe('Testing HomePage', () => {
  it('Testing if the homepage is loading', () => {
    cy.visit('https://magento.softwaretestingboard.com')
  })
  it('Testing if the search is working', () => {
    cy.visit('https://magento.softwaretestingboard.com');
    cy.get('#search').type('{selectall}');
    cy.get('#search').type('{backspace}');
    
    const searchTerm = 'shirt';
    cy.wrap(searchTerm.split('')).each((letter) => {
      cy.get('#search').type(letter, { delay: 100 });
    });

    cy.wait(3000);
    cy.get('.search-autocomplete li:last-child').invoke('text').as('lastAutoCompleteText');
    cy.get('.search-autocomplete li:last-child').click();

    cy.get('@lastAutoCompleteText').then((lastAutoCompleteText) => {
      cy.get('body').should('include.text', lastAutoCompleteText);
    });
  })
})
