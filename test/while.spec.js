import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('While', () => {
    describe('source', () => {
        it('is well formed', () => {
            const a = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Bool), 'a'));
            const b = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Bool), 'b'));
            const whileStmt = new cgl.While(
                new cgl.Reference(a),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.EqualAssignment(new cgl.Reference(a), new cgl.Reference(b))
                    )
                ])
            );

            expect(whileStmt.source()).to.equalIgnoreSpaces('while (a) { a=b; }');
        });
    });
});
