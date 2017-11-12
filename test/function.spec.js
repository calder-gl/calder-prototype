import { expect } from 'chai';
import * as cgl from '../src/calder';

function basicMain() {
    const glPosition = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'gl_Position'));
    const vertexPosition = new cgl.InterfaceVariable(cgl.Qualifier.Attribute, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'vertexPosition'));
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
              .map(dependency => dependency.name())
              .sort();

            expect(dependencyNames).to.eql(['gl_Position', 'vertexPosition']);
        });
    });
});
