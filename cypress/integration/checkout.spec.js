describe("Add and Checkout the product",()=>{

    before(()=>{
        cy.visit("/")
    })

    it("Verify that all the sizes should be present in the page and select S size",()=>{
        var sizes=["XS","S","M","ML","L","XL","XXL"]
        cy.get('div.filters').should('be.exist').within(()=>{
            cy.get('div.filters-available-size').children('label').each(($el,index,$list)=>{
                if(index==1){
                    //Select small size
                    cy.wrap($el).children('span').should('have.text',sizes[index]).click()
                }else{
                    //verify the all sizes
                    cy.wrap($el).children('span').should('have.text',sizes[index])
                }
                
            })
        })

    })

    it("Verify the Product with Size S",()=>{
        cy.get('div.shelf-container').should('be.exist').within(()=>{
            cy.get('[data-sku="12064273040195392"]').within(()=>{
                //verify the text free shipping
                cy.get('div.shelf-stopper').should('have.text','Free shipping')
                //verify the item image
                cy.get('img').should('have.attr','src',"/static/media/12064273040195392_1.2995d79a.jpg")
                //verify the title of the item
                cy.get('p.shelf-item__title').contains('Cat Tee Black T-Shirt')
                cy.get('div.shelf-item__price').within(()=>{
                    //Verify the price of the product
                    cy.get('div.installment').contains('or 9 x$1.21')
                })
                //Verify the Add to cart text and click on it
                cy.get('div.shelf-item__buy-btn').should('have.text','Add to cart').click()
            })
        })
    })

    it("Verify the items in Cart",()=>{
        cy.get('div.float-cart--open').within(()=>{
            cy.get('div.float-cart__header').within(()=>{
                cy.get('span.bag').should('be.exist')
                //Verify the text "Cart"
                cy.get('span.header-title').should('have.text','Cart')
            })
            cy.get('div.shelf-item').within(()=>{
                //Verify the image of the item should exist in the DOM
                cy.get('img').should('be.exist')
                cy.get('div.shelf-item__details').within(()=>{

                    //Verify the item title
                    cy.get('p.title').should('have.text','Cat Tee Black T-Shirt')
                })
                //Verify the price of the item
                cy.get('div.shelf-item__price ').within(()=>{
                    cy.get('p').contains('$ 10.90')
                    cy.get('button').eq(0).contains('-')
                    cy.get('button').eq(1).contains('+')
                })
            })

            cy.get('div.float-cart__footer').within(()=>{
                //Verify the text SUBTOTAL
                cy.get('div.sub').should('have.text','SUBTOTAL')
                cy.get('div.sub-price').within(()=>{
                    cy.get('p').contains('$ 10.90')
                    cy.get('small.sub-price__installment span').contains('OR UP TO 9 x $ 1.21')
                })
                cy.get('div.buy-btn').contains('Checkout').click({force:true}).then(()=>{
                    cy.on('window:alert', (str) => {
                        //verify the text of the alert box
                        expect(str).to.equal(`Checkout - Subtotal: $ 10.90`)
                      })
                })
            })
        })
    })
})