import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('ShaderPipelineBuilder', () => {
    describe('checkInputsAndOutputs', () => {
        it('has all fragment shader outputs in vertex shader inputs', () => {
            const ptColour = new cgl.Variable(cgl.Qualifier.Out, cgl.Type.Vec4, 'colour');            
            const glPosition = new cgl.Variable(cgl.Qualifier.Out, cgl.Type.Vec4, 'gl_Position');            
            const vertexPosition = new cgl.Variable(cgl.Qualifier.Attribute, cgl.Type.Vec4, 'vertexPosition');
            const colour = new cgl.Variable(cgl.Qualifier.In, cgl.Type.Vec4, 'colour');
            const outColour = new cgl.Variable(cgl.Qualifier.Out, cgl.Type.Vec4, 'outColour');

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
            const glPosition = new cgl.Variable(cgl.Qualifier.Out, cgl.Type.Vec4, 'gl_Position');            
            const vertexPosition = new cgl.Variable(cgl.Qualifier.Attribute, cgl.Type.Vec4, 'vertexPosition');
            const depth = new cgl.Variable(cgl.Qualifier.In, cgl.Type.Float, 'depth');
            const outDepth = new cgl.Variable(cgl.Qualifier.Out, cgl.Type.Float, 'outDepth');

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
