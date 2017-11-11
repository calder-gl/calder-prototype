import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('DoWhile', () => {
    describe('dependencies', () => {
        it('includes both the then and else blocks', () => {
            const conditionInterfaceVariable = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(new cgl.Type(cgl.Kind.Bool), 'condition'));
            const someInterfaceVariable1 = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(new cgl.Type(cgl.Kind.Bool), 'someInterfaceVariable1'));
            const doWhileStmt = new cgl.DoWhile(
                new cgl.Reference(conditionInterfaceVariable),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.EqualAssignment(new cgl.Reference(conditionInterfaceVariable), new cgl.Reference(someInterfaceVariable1))
                    )
                ])
            );

            const dependencyNames = [...doWhileStmt.dependencies()]
                .map(dependency => dependency.name)
                .sort();
            expect(dependencyNames).to.eql(['condition', 'someInterfaceVariable1']);
        });
    });

    describe('source', () => {
        it('is well formed', () => {
            const a = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(new cgl.Type(cgl.Kind.Bool), 'a'));
            const b = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(new cgl.Type(cgl.Kind.Bool), 'b'));
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
