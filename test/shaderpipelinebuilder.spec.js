import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('ShaderPipelineBuilder', () => {
    describe('checkInputsAndOutputs', () => {
        it('has all fragment shader outputs in vertex shader inputs', () => {
            const ptColour = new cgl.Interface(cgl.Qualifier.Out, new cgl.Variable(cgl.Type.Vec4, 'colour'));
            const glPosition = new cgl.Interface(cgl.Qualifier.Out, new cgl.Variable(cgl.Type.Vec4, 'gl_Position'));
            const vertexPosition = new cgl.Interface(cgl.Qualifier.Attribute, new cgl.Variable(cgl.Type.Vec4, 'vertexPosition'));
            const colour = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Vec4, 'colour'));
            const outColour = new cgl.Interface(cgl.Qualifier.Out, new cgl.Variable(cgl.Type.Vec4, 'outColour'));

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
            const glPosition = new cgl.Interface(cgl.Qualifier.Out, new cgl.Variable(cgl.Type.Vec4, 'gl_Position'));
            const vertexPosition = new cgl.Interface(cgl.Qualifier.Attribute, new cgl.Variable(cgl.Type.Vec4, 'vertexPosition'));
            const depth = new cgl.Interface(cgl.Qualifier.In, new cgl.Variable(cgl.Type.Float, 'depth'));
            const outDepth = new cgl.Interface(cgl.Qualifier.Out, new cgl.Variable(cgl.Type.Float, 'outDepth'));

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
