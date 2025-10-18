/// <reference types="cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://campplannerpipeline.s3-website-us-east-1.amazonaws.com/');
    cy.contains('Start Your Next Adventure!').should('be.visible'); // Check for visible text
    
  })
})