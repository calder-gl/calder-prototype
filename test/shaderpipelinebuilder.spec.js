import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('ShaderPipelineBuilder', () => {
    describe('checkInputsAndOutputs', () => {
        it('has all fragment shader outputs in vertex shader inputs', () => {
            const ptColour = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'colour'));
            const glPosition = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'gl_Position'));
            const vertexPosition = new cgl.InterfaceVariable(cgl.Qualifier.Attribute, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'vertexPosition'));
            const colour = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'colour'));
            const outColour = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'outColour'));

            const vertexShader = new cgl.Shader(
                new cgl.Function('main', [
                    new cgl.Statement(
                        new cgl.Assignment(
                            new cgl.Reference(glPosition),
                            new cgl.Reference(vertexPosition)
                        )
                    ),
                    new cgl.Statement(
                        new cgl.Assignment(
                            new cgl.Reference(ptColour),
                            new cgl.Reference(vertexPosition)
                        )
                    )
                ])
            );

            const fragShader = new cgl.Shader(
                new cgl.Function('main', [
                    new cgl.Statement(
                        new cgl.Assignment(
                            new cgl.Reference(outColour),
                            new cgl.Reference(colour)
                        )
                    )
                ])
            );

            const pipelineBuilder = new cgl.ShaderPipelineBuilder(vertexShader, fragShader);

            expect(pipelineBuilder.isWellFormed).to.be.true;
        });

        it('has some fragment shader outputs not in vertex shader inputs', () => {
            const glPosition = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'gl_Position'));
            const vertexPosition = new cgl.InterfaceVariable(cgl.Qualifier.Attribute, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'vertexPosition'));
            const depth = new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Float), 'depth'));
            const outDepth = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Float), 'outDepth'));

            const vertexShader = new cgl.Shader(
                new cgl.Function('main', [
                    new cgl.Statement(
                        new cgl.Assignment(
                            new cgl.Reference(glPosition),
                            new cgl.Reference(vertexPosition)
                        )
                    )
                ])
            );

            const fragShader = new cgl.Shader(
                new cgl.Function('main', [
                    new cgl.Statement(
                        new cgl.Assignment(
                            new cgl.Reference(outDepth),
                            new cgl.Reference(depth)
                        )
                    )
                ])
            );

            const pipelineBuilder = new cgl.ShaderPipelineBuilder(vertexShader, fragShader);

            expect(pipelineBuilder.isWellFormed).to.be.false;
        });
    });
});
