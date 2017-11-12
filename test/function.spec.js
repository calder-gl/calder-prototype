import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Function', () => {
    describe('source', () => {
        it('creates the correct source', () => {
            const glPosition = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'gl_Position'));
            const vertexPosition = new cgl.InterfaceVariable(cgl.Qualifier.Attribute, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'vertexPosition'));
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
    });
});
