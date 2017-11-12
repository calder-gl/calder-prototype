import { expect } from 'chai';
import * as cgl from '../../../src/calder';

describe('Unary Expressions', () => {
    let lhs = new cgl.Reference(new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(new cgl.Type(cgl.Kind.Int), 'lhs')));

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
        let constVar = new cgl.Reference(new cgl.InterfaceVariable(cgl.Qualifier.Const, new cgl.Variable(new cgl.Type(cgl.Kind.Int), 'lhs')));
        let stringVar = new cgl.Reference(new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(new cgl.Type(cgl.Kind.String), 'lhs')));

        it ('throws error on mutation of const variable', () => {
            expect(() => new cgl.PostfixDecrement(constVar))
                .to.throw('Can\'t mutate constant variable.');
        });

        it ('throws error when type of reference is not integer', () => {
            expect(() => new cgl.PostfixDecrement(stringVar))
                .to.throw('Can only perform unary expression on integer type.');
        });
    });
});
