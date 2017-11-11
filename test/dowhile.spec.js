import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('DoWhile', () => {
    describe('dependencies', () => {
        it('includes both the then and else blocks', () => {
            const conditionInterface = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'condition'));
            const someInterface1 = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'someInterface1'));
            const doWhileStmt = new cgl.DoWhile(
                new cgl.Reference(conditionInterface),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.Assignment(new cgl.Reference(conditionInterface), new cgl.Reference(someInterface1))
                    )
                ])
            );

            const dependencyNames = [...doWhileStmt.dependencies()]
                .map(dependency => dependency.name)
                .sort();
            expect(dependencyNames).to.eql(['condition', 'someInterface1']);
        });
    });

    describe('source', () => {
        it('is well formed', () => {
            const a = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'a'));
            const b = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Bool, 'b'));
            const doWhileStmt = new cgl.DoWhile(
                new cgl.Reference(a),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.Assignment(new cgl.Reference(a), new cgl.Reference(b))
                    )
                ])
            );

            expect(doWhileStmt.source()).to.equalIgnoreSpaces('do { a=b; } while (a)');
        });
    });
});
