import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Function', () => {
    describe('source', () => {
        const glPosition = new cgl.InterfaceVariable(
            cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'gl_Position')
        );
        const vertexPosition = new cgl.InterfaceVariable(
            cgl.Qualifier.Attribute, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'vertexPosition')
        );
        const integerVar = new cgl.InterfaceVariable(
            cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Int), '0')
        );

        it('creates the correct source', () => {
            const main = new cgl.Function('main', [
                new cgl.Statement(
                    new cgl.EqualAssignment(
                        new cgl.Reference(glPosition),
                        new cgl.Reference(vertexPosition)
                    )
                )
            ]);

            expect(main.source()).to.equalIgnoreSpaces(`void main() {
                gl_Position = vertexPosition;
            }`);
        });

        it('handles different return types', () => {
            const test = new cgl.Function(
                'test', [new cgl.ReturnStatement(new cgl.Reference(integerVar), cgl.Kind.Int)], cgl.Kind.Int
            );

            expect(test.source()).to.equalIgnoreSpaces(`int test() {
                return 0;
            }`);
        });
    });
});
