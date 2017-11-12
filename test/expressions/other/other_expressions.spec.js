import { expect } from 'chai';
import * as cgl from '../../../src/calder';

describe('Other Expressions', () => {
    let lhs = new cgl.Reference(
        new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Int), 'lhs'))
    );
    let rhs = new cgl.Reference(
        new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Int), 'rhs'))
    );

    describe('Comma', () => {
        describe('source', () => {
            it ('returns a comma separated list', () => {
                const operation = new cgl.Comma(lhs, rhs);
                expect(operation.source()).to.equalIgnoreSpaces('lhs, rhs');
            });
        });
    });
});
