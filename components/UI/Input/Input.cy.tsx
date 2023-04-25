import Input from './Input';

describe('Input component', () => {
    it('renders correctly with props', () => {
        cy.mount(
            <Input
                type="text"
                placeholder="Type here"
                classes="my-custom-class"
            />,
        );
        cy.get('input').should('exist');
        cy.get('input').should('have.attr', 'type', 'text');
        cy.get('input').should('have.attr', 'placeholder', 'Type here');
        cy.get('input').should('have.class', 'my-custom-class');
    });
});
