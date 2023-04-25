import Button from './Button';

describe('Button component', () => {
    it('should render the button with the correct props', () => {
        const buttonText = 'Click me';
        const type = 'button';
        const onClick = cy.stub().as('clickEvent');
        const classes = 'bg-blue-500 text-white';

        cy.mount(
            <Button type={type} onClick={onClick} classes={classes}>
                {buttonText}
            </Button>,
        );

        cy.get('button')
            .should('have.class', 'btn my-2 md:my-4')
            .should('have.class', 'bg-blue-500 text-white')
            .should('have.attr', 'type', type)
            .contains(buttonText);

        cy.get('button')
            .click()
            .then(() => {
                expect(onClick).to.be.calledOnce;
            });
    });
});
