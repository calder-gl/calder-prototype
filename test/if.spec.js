import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('If', () => {
    describe('dependencies', () => {
        it('includes both the then and else blocks', () => {
            const conditionInterface = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'condition'));
            const someInterface1 = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'someInterface1'));
            const someInterface2 = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'someInterface2'));
            const ifStmt = new cgl.If(
                new cgl.Reference(conditionInterface),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.Assignment(new cgl.Reference(conditionInterface), new cgl.Reference(someInterface1))
                    )
                ]),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.Assignment(new cgl.Reference(conditionInterface), new cgl.Reference(someInterface2))
                    )
                ])
            );

            const dependencyNames = [...ifStmt.dependencies()]
                .map(dependency => dependency.name)
                .sort();
            expect(dependencyNames).to.eql(['condition', 'someInterface1', 'someInterface2']);
        });

        it('excludes the else block if none is present', () => {
            const conditionInterface = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'condition'));
            const someInterface1 = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'someInterface1'));
            const ifStmt = new cgl.If(
                new cgl.Reference(conditionInterface),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.Assignment(new cgl.Reference(conditionInterface), new cgl.Reference(someInterface1))
                    )
                ])
            );

            const dependencyNames = [...ifStmt.dependencies()]
                .map(dependency => dependency.name)
                .sort();
            expect(dependencyNames).to.eql(['condition', 'someInterface1']);
        });
    });

    describe('source', () => {
        it('has no else block if none is provided', () => {
            const a = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'a'));
            const b = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'b'));
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
            const a = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'a'));
            const b = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'b'));
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
