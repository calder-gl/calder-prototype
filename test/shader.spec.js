import chai from 'chai';
import chaiString from 'chai-string';
import * as cgl from '../src/calder';

chai.use(chaiString);
const { expect } = chai;

function basicShader() {
    const glPosition = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'gl_Position'));
    const vertexPosition = new cgl.InterfaceVariable(cgl.Qualifier.Attribute, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'vertexPosition'));
    const shader = new cgl.Shader(
        new cgl.Function('main', [
            new cgl.Statement(
                new cgl.EqualAssignment(
                    new cgl.Reference(glPosition),
                    new cgl.Reference(vertexPosition)
                )
            )
        ])
    );

    return shader;
}

describe('Shader', () => {
    describe('source', () => {
        it('generates the expected source code', () => {
            const shader = basicShader();
            const source = shader.source();

            // TODO: recognize gl_Position as a default that doesn't need declaring
            const expected = `
                attribute vec4 vertexPosition;
                out vec4 gl_Position;

                void main() {
                    gl_Position = vertexPosition;
                }`;

            expect(source).to.equalIgnoreSpaces(expected);
        });
    });
});
