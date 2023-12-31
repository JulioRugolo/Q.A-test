/// <reference types="cypress" />

describe('Testing Checkout', () => {
    let userData;

    before(() => {
        cy.request('https://randomuser.me/api/').then((response) => {
            userData = response.body.results[0];
        });
    });

    it('Searching shirt and adding to cart', () => {
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
        cy.wait(2000);
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click();
        cy.wait(2000);
        cy.get('#option-label-size-143-item-166').click();
        cy.wait(2000);
        cy.get('#option-label-color-93-item-50').click();
        cy.wait(2000);
        cy.get('#product-addtocart-button').click();
        cy.wait(2000);

        cy.get('.message-success > div > a').click();
        cy.wait(2000);

        cy.get('.checkout-methods-items > :nth-child(1) > .action').click();
        cy.wait(2000);

        cy.get('#customer-email-fieldset > .required > .control > #customer-email').type(userData.email);
        cy.wait(1000);
        cy.get('[name="shippingAddress.firstname"]').type(userData.name.first);
        cy.wait(1000);
        cy.get('[name="shippingAddress.lastname"]').type(userData.name.last);
        cy.wait(1000);
        cy.get('[name="shippingAddress.company"]').type('Company XYZ'); // Preencha com o valor desejado
        cy.wait(1000);
        cy.get('[name="shippingAddress.street.0"]').type(userData.location.street.number + ' ' + userData.location.street.name);
        cy.wait(1000);
        cy.get('[name="shippingAddress.city"]').type(userData.location.city);
        cy.wait(1000);
        cy.get('[name="shippingAddress.region_id"] select').select('1');
        cy.wait(1000);
        cy.get('[name="shippingAddress.postcode"]').type(userData.location.postcode);
        cy.wait(1000);
        cy.get('[name="shippingAddress.telephone"]').type(userData.phone);
        cy.wait(1000);
        cy.get(':nth-child(1) > :nth-child(1) > .radio').click();
        cy.wait(1000);
        cy.get('.button').click();
        cy.wait(1000);

        cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click();
        cy.wait(1000);
        cy.get('#registration > :nth-child(3) > .action').click();
        cy.wait(1000);

        function generateRandomString(length) {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * charset.length);
              result += charset[randomIndex];
            }
            return result;
          }

        const newPassword =
        generateRandomString(8) + 'Aa1!';
        cy.get('#password').type(newPassword);
        cy.get('#password-confirmation').type(newPassword);
        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click();
    })
})