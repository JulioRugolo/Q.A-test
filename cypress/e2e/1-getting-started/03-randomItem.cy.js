/// <reference types="cypress" />

describe('Testing Checkout', () => {
    let userData;

    before(() => {
        cy.request('https://randomuser.me/api/').then((response) => {
            userData = response.body.results[0];
        });
    });

    it('add to cart a random male item and submit a review', () => {
        cy.visit('https://magento.softwaretestingboard.com');
        cy.get('#ui-id-5').click();
        cy.get('dd > .items > :nth-child(1) > a').click();

        const totalItems = 12;
        const randomIndex = Math.floor(Math.random() * totalItems) + 1;
        cy.get(`:nth-child(${randomIndex}) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo`).click();
        cy.wait(2000);

        cy.get('.size').first().click();
        cy.wait(2000);

        const firstChildSelector = '.swatch-attribute-options > .swatch-option.color:first-child';
        cy.get(firstChildSelector).click();
        cy.wait(2000);

        cy.get('#product-addtocart-button').click();
        cy.wait(2000);

        // Verifica se a mensagem de sucesso está presente
        cy.get('.message-success > div', { timeout: 10000 }).then(($successMessage) => {
            if ($successMessage.length > 0) {
                // Se a mensagem de sucesso está presente, procede com a lógica de sucesso
                cy.get('#tab-label-reviews-title').click();
                cy.get('#Rating_5').should('be.visible').click({ force: true });
                cy.get('#nickname_field').type(userData.login.username);
                cy.get('#summary_field').type('Great product!');
                cy.get('#review_field').type('I really liked this product. It is very comfortable and the fabric is great.');
                cy.get('.actions-primary > .action').click();
            } else {
                // Se a mensagem de sucesso não está presente, verifica a mensagem de erro
                cy.get('.message-error > div').should('exist');
                // Procede com a lógica de erro, se necessário
                cy.get('.size').click();
            }
        });
    });
});
