import { expect } from 'chai';
import * as cgl from '../src/calder';

function basicMain() {
    const glPosition = new cgl.Variable(cgl.Qualifier.Out, 'vec4', 'gl_Position');
    const vertexPosition = new cgl.Variable(cgl.Qualifier.Attribute, 'vec4', 'vertexPosition');
    const main = new cgl.Function('main', [
        new cgl.Assignment(
            new cgl.Reference(glPosition),
            new cgl.Reference(vertexPosition)
        )
    ]);

    return main;
}

describe('Function', () => {
    describe('dependencies', () => {
        it('knows what variables it depends on', () => {
            const main = basicMain();
            const dependencyNames = [...main.dependencies()]
              .map(dependency => dependency.name)
              .sort();

            expect(dependencyNames).to.eql(['gl_Position', 'vertexPosition']);
        });
    });
});
