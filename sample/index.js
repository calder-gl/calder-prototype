import * as cgl from '../src/calder';

const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

const glPosition = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'gl_Position'));
const glFragColor = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'gl_FragColor'));
const vertexPosition = new cgl.InterfaceVariable(cgl.Qualifier.Attribute, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'vertexPosition'));
const colour = new cgl.InterfaceVariable(cgl.Qualifier.Uniform, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'colour'));

const vertexShader = new cgl.Shader(
    new cgl.Function('main', [
        new cgl.Statement(
            new cgl.Assignment(
                new cgl.Reference(glPosition),
                new cgl.Reference(vertexPosition)
            )
        )
    ]), [], [new cgl.VariableDeclaration(vertexPosition)]
);

const fragShader = new cgl.Shader(
    new cgl.Function('main', [
        new cgl.Statement(
            new cgl.Assignment(
                new cgl.Reference(glFragColor),
                new cgl.Reference(colour)
            )
        )
    ]), [new cgl.VariableDeclaration(colour)], [new cgl.VariableDeclaration(colour)]
);

const pipelineBuilder = new cgl.ShaderPipelineBuilder(vertexShader, fragShader);
const pipeline = pipelineBuilder.build(gl);

pipeline.setAttribute('vertexPosition', [
    1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0
]);
pipeline.setUniform('colour', [1.0,  0.0,  0.0,  1.0]);
pipeline.useProgram();
pipeline.run();
