import { expect } from 'chai';
import * as cgl from '../../../src/calder';

describe('Unary Expressions', () => {
    let lhs = new cgl.Reference(new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Int), 'lhs')));

    describe('source', () => {
        it ('prefix increment', () => {
            const operation = new cgl.PrefixIncrement(lhs);
            expect(operation.source()).to.equalIgnoreSpaces('++lhs');
        });

        it ('prefix decrement', () => {
            const operation = new cgl.PrefixDecrement(lhs);
            expect(operation.source()).to.equalIgnoreSpaces('--lhs');
        });

        it ('postfix increment', () => {
            const operation = new cgl.PostfixIncrement(lhs);
            expect(operation.source()).to.equalIgnoreSpaces('lhs++');
        });

        it ('postfix decrement', () => {
            const operation = new cgl.PostfixDecrement(lhs);
            expect(operation.source()).to.equalIgnoreSpaces('lhs--');
        });
    });

    describe('errors', () => {
        let constVar = new cgl.Reference(new cgl.InterfaceVariable(cgl.Qualifier.Const, new cgl.VariableSource(new cgl.Type(cgl.Kind.Int), 'lhs')));
        let stringVar = new cgl.Reference(new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.String), 'lhs')));

        it ('throws error when type of reference is not integer', () => {
            expect(() => new cgl.PostfixDecrement(stringVar))
                .to.throw('Can only perform unary expression on integer type.');
        });
    });
});
