import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Shader', () => {
    describe('source', () => {
        it('generates the expected source code', () => {
            const glPosition = new cgl.Variable(cgl.Qualifier.Out, 'vec4', 'gl_Position');
            const vertexPosition = new cgl.Variable(cgl.Qualifier.Attribute, 'vec4', 'vertexPosition');
            const shader = new cgl.Shader(new cgl.Function('main', [
                new cgl.Assignment(
                    new cgl.Reference(glPosition),
                    new cgl.Reference(vertexPosition))]));

            const source = shader.source();

            // TODO: recognize gl_Position as a default that doesn't need declaring
            const expected = `
                attribute vec4 vertexPosition;
                out vec4 gl_Position;

                void main() {
                    gl_Position = aVertexPosition;
                }`;

            expect(source).to.equalIgnoreSpaces(expected);
        });
    })
});
