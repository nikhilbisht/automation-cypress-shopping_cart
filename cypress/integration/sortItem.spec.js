describe("Sort the items and Verify after sorting",()=>{

    before(()=>{
        cy.visit("/")
    })

    it("Sort the item in Lowest to Highest Order",()=>{
 
        cy.get('div.sort').should('be.exist').within(()=>{
            //Sort the item in lowestprice
            cy.get('select').select('lowestprice')
                            
        })

    })

    it("Verify the item after sorting",()=>{
        cy.get('div.shelf-container').should('be.exist').within(()=>{
            //Verifying the first item
            cy.get('div.shelf-item').eq(0).within(()=>{
                //verify the text Fress shipping
                cy.get('div.shelf-stopper').should('have.text','Free shipping')
                cy.get('img').should("be.exist")
        
                //Verify the text Add to cart
                cy.get('div.shelf-item__buy-btn').should('have.text','Add to cart').click()
            })
        })
    })
})