describe("Add the item in the Cart, Close the Cart and Open the cart from the header", () => {

    before(() => {
        cy.visit("/")
    })

    it("Select the S size and Add the Product", () => {

        cy.get('div.filters').should('be.exist').within(() => {
            //Select the size S
            cy.get('span.checkmark').contains('S').click()


        })

        cy.get('div.shelf-container').should('be.exist').within(() => {
            cy.get('[data-sku="12064273040195392"]').within(() => {
                //add the product to the Cart
                cy.get('div.shelf-item__buy-btn').should('have.text', 'Add to cart').click()
            })
        })

    })

    it("Close the Cart and Open the cart from header", () => {
        cy.get('div.float-cart--open').within(()=>{
            //Close the Cart
            cy.get('div.float-cart__close-btn').contains('X').click()
        })
        //Open the cart from header
        cy.get('span.bag--float-cart-closed').click().then(()=>{
            cy.get('div.float-cart__header').within(()=>{
                cy.get('span.bag').should('be.exist')
                //verify the text Cart
                cy.get('span.header-title').should('have.text','Cart')
            })
            cy.get('div.shelf-item').within(()=>{
                cy.get('img').should('be.exist')
                
                cy.get('div.shelf-item__price ').within(()=>{
                    cy.get('p').contains('$ 10.90')
                    cy.get('button').eq(0).contains('-')
                    //add the same item again
                    cy.get('button').eq(1).contains('+').click()
                })
                cy.get('div.shelf-item__details').within(()=>{
                    //Verify the title
                    cy.get('p.title').should('have.text','Cat Tee Black T-Shirt')
                    cy.get('p.desc').contains('S | Black with custom print Quantity: 2')
                })
            })

            cy.get('div.float-cart__footer').within(()=>{
                cy.get('div.sub').should('have.text','SUBTOTAL')
                cy.get('div.sub-price').within(()=>{
                    cy.get('p').contains('$ 21.80')
                    cy.get('small.sub-price__installment span').contains('OR UP TO 9 x $ 2.42')
                })
                cy.get('div.buy-btn').contains('Checkout').click().then(()=>{
                    cy.on('window:alert', (str) => {
                        expect(str).to.equal(`Checkout - Subtotal: $ 21.80`)
                      })
                })
            })

        })
    })
})