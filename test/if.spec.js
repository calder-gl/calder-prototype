import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('If', () => {
    describe('source', () => {
        const a = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Bool), 'a'));
        const b = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Bool), 'b'));
        const c = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Bool), 'c'));

        it('has no else block if none is provided', () => {
            const ifStmt = new cgl.If(
                new cgl.Reference(a),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.EqualAssignment(new cgl.Reference(a), new cgl.Reference(b))
                    )
                ])
            );

            expect(ifStmt.source()).to.equalIgnoreSpaces('if (a) { a=b; }');
        });

        it('has no else block if an empty block is provided', () => {
            const ifStmt = new cgl.If(
                new cgl.Reference(a),
                new cgl.Block([
                    new cgl.Statement(
                        new cgl.EqualAssignment(new cgl.Reference(a), new cgl.Reference(b))
                    )
                ]),
                new cgl.Block()
            );

            expect(ifStmt.source()).to.equalIgnoreSpaces('if (a) { a=b; }');
        });

        describe('boolean expressions', () => {
            it('and', () => {
                const ifStmt = new cgl.If(
                    new cgl.AndExpression(new cgl.Reference(a), new cgl.Reference(b)),
                    new cgl.Block([]),
                    new cgl.Block()
                );

                expect(ifStmt.source()).to.equalIgnoreSpaces('if ((a && b)) {}');
            });

            it('or', () => {
                const ifStmt = new cgl.If(
                    new cgl.OrExpression(new cgl.Reference(a), new cgl.Reference(b)),
                    new cgl.Block([]),
                    new cgl.Block()
                );

                expect(ifStmt.source()).to.equalIgnoreSpaces('if ((a || b)) {}');
            });

            it('equal', () => {
                const ifStmt = new cgl.If(
                    new cgl.EqualExpression(new cgl.Reference(a), new cgl.Reference(b)),
                    new cgl.Block([]),
                    new cgl.Block()
                );

                expect(ifStmt.source()).to.equalIgnoreSpaces('if ((a == b)) {}');
            });

            it('xor', () => {
                const ifStmt = new cgl.If(
                    new cgl.XorExpression(new cgl.Reference(a), new cgl.Reference(b)),
                    new cgl.Block([]),
                    new cgl.Block()
                );

                expect(ifStmt.source()).to.equalIgnoreSpaces('if ((a ^^ b)) {}');
            });

            it('less than', () => {
                const ifStmt = new cgl.If(
                    new cgl.LessThanExpression(new cgl.Reference(a), new cgl.Reference(b)),
                    new cgl.Block([]),
                    new cgl.Block()
                );

                expect(ifStmt.source()).to.equalIgnoreSpaces('if ((a < b)) {}');
            });

            it('less than equal', () => {
                const ifStmt = new cgl.If(
                    new cgl.LessThanEqualExpression(new cgl.Reference(a), new cgl.Reference(b)),
                    new cgl.Block([]),
                    new cgl.Block()
                );

                expect(ifStmt.source()).to.equalIgnoreSpaces('if ((a <= b)) {}');
            });

            it('greater than', () => {
                const ifStmt = new cgl.If(
                    new cgl.GreaterThanExpression(new cgl.Reference(a), new cgl.Reference(b)),
                    new cgl.Block([]),
                    new cgl.Block()
                );

                expect(ifStmt.source()).to.equalIgnoreSpaces('if ((a > b)) {}');
            });

            it('greater than equal', () => {
                const ifStmt = new cgl.If(
                    new cgl.GreaterThanEqualExpression(new cgl.Reference(a), new cgl.Reference(b)),
                    new cgl.Block([]),
                    new cgl.Block()
                );

                expect(ifStmt.source()).to.equalIgnoreSpaces('if ((a >= b)) {}');
            });

            it('nested', () => {
                const ifStmt = new cgl.If(
                    new cgl.AndExpression(new cgl.Reference(a), new cgl.OrExpression(new cgl.Reference(b), new cgl.Reference(c))),
                    new cgl.Block([]),
                    new cgl.Block()
                );

                expect(ifStmt.source()).to.equalIgnoreSpaces('if ( ( a && (b || c) ) ) {}');
            });
        });
    });
});
