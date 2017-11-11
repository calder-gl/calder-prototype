import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('If', () => {
    describe('dependencies', () => {
        it('includes both the then and else blocks', () => {
            const conditionInterfaceVariable = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'condition'));
            const someInterfaceVariable1 = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'someInterfaceVariable1'));
            const someInterfaceVariable2 = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'someInterfaceVariable2'));
            const ifStmt = new cgl.If(
                new cgl.Reference(conditionInterfaceVariable),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.Assignment(new cgl.Reference(conditionInterfaceVariable), new cgl.Reference(someInterfaceVariable1))
                    )
                ]),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.Assignment(new cgl.Reference(conditionInterfaceVariable), new cgl.Reference(someInterfaceVariable2))
                    )
                ])
            );

            const dependencyNames = [...ifStmt.dependencies()]
                .map(dependency => dependency.name)
                .sort();
            expect(dependencyNames).to.eql(['condition', 'someInterfaceVariable1', 'someInterfaceVariable2']);
        });

        it('excludes the else block if none is present', () => {
            const conditionInterfaceVariable = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'condition'));
            const someInterfaceVariable1 = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'someInterfaceVariable1'));
            const ifStmt = new cgl.If(
                new cgl.Reference(conditionInterfaceVariable),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.Assignment(new cgl.Reference(conditionInterfaceVariable), new cgl.Reference(someInterfaceVariable1))
                    )
                ])
            );

            const dependencyNames = [...ifStmt.dependencies()]
                .map(dependency => dependency.name)
                .sort();
            expect(dependencyNames).to.eql(['condition', 'someInterfaceVariable1']);
        });
    });

    describe('source', () => {
        it('has no else block if none is provided', () => {
            const a = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'a'));
            const b = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'b'));
            const ifStmt = new cgl.If(
                new cgl.Reference(a),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.Assignment(new cgl.Reference(a), new cgl.Reference(b))
                    )
                ])
            );

            expect(ifStmt.source()).to.equalIgnoreSpaces('if (a) { a=b; }');
        });
    });

    describe('source', () => {
        it('has no else block if an empty block is provided', () => {
            const a = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'a'));
            const b = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'b'));
            const ifStmt = new cgl.If(
                new cgl.Reference(a),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.Assignment(new cgl.Reference(a), new cgl.Reference(b))
                    )
                ]),
                new cgl.Block()
            );

            expect(ifStmt.source()).to.equalIgnoreSpaces('if (a) { a=b; }');
        });
    });
});
