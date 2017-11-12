import { expect } from 'chai';
import * as cgl from '../../../src/calder';

describe('Infix Expressions', () => {
    let lhs = new cgl.Reference(
        new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Int), '1'))
    );
    let rhs = new cgl.Reference(
        new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Int), '1'))
    );
    let floatVar = new cgl.Reference(
        new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Float), '1.5'))
    );

    describe('source', () => {
        it ('addition', () => {
            const operation = new cgl.Addition(lhs, rhs);
            expect(operation.source()).to.equalIgnoreSpaces('1 + 1');
        });

        it ('subtraction', () => {
            const operation = new cgl.Subtraction(lhs, rhs);
            expect(operation.source()).to.equalIgnoreSpaces('1 - 1');
        });

        it ('multiplication', () => {
            const operation = new cgl.Multiplication(lhs, rhs);
            expect(operation.source()).to.equalIgnoreSpaces('1 * 1');
        });

        it ('division', () => {
            const operation = new cgl.Division(lhs, rhs);
            expect(operation.source()).to.equalIgnoreSpaces('1 / 1');
        });

        it ('modulo', () => {
            const operation = new cgl.Modulo(lhs, rhs);
            expect(operation.source()).to.equalIgnoreSpaces('1 % 1');
        });
    });

    describe('returnType', () => {
        let otherIntType = new cgl.Reference(
            new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Int), '1'))
        );

        it('returns float when one of the variables is of type float', () => {
            const operation = new cgl.Subtraction(lhs, floatVar);
            expect(operation.returnType()).to.deep.equal(new cgl.Type(cgl.Kind.Float));
        });

        it('returns int when both of the variables are of type int', () => {
            const operation = new cgl.Subtraction(lhs, rhs);
            expect(operation.returnType()).to.deep.equal(new cgl.Type(cgl.Kind.Int));
        });
    });

    describe('errors', () => {
        let stringVar = new cgl.Reference(
            new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.String), 'rhs'))
        );

        it ('can\'t add string to integer', () => {
            expect(() => new cgl.Addition(lhs, stringVar))
                .to.throw('LHS and RHS must be of type Int or Float.');
        });

        it('modulo must have both types integers', () => {
            expect(() => new cgl.Modulo(lhs, floatVar))
                .to.throw('LHS and RHS must be of type Int.');
        });
    });
});
