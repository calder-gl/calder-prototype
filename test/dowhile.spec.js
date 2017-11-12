import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('DoWhile', () => {
    describe('source', () => {
        it('is well formed', () => {
            const a = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Bool), 'a'));
            const b = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Bool), 'b'));
            const doWhileStmt = new cgl.DoWhile(
                new cgl.Reference(a),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.EqualAssignment(new cgl.Reference(a), new cgl.Reference(b))
                    )
                ])
            );

            expect(doWhileStmt.source()).to.equalIgnoreSpaces('do { a=b; } while (a)');
        });
    });
});
