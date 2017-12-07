import * as cgl from "../src/calder.js";
const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

const glPosition = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'gl_Position'));
const glFragColor = new cgl.InterfaceVariable(cgl.Qualifier.Out, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'gl_FragColor'));
const vertexPosition = new cgl.InterfaceVariable(cgl.Qualifier.Attribute, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'vertexPosition'));
const colour = new cgl.InterfaceVariable(cgl.Qualifier.Uniform, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'colour'));
const modelView = new cgl.InterfaceVariable(cgl.Qualifier.Uniform, new cgl.VariableSource(new cgl.Type(cgl.Kind.Mat4), 'modelView'));
const projection = new cgl.InterfaceVariable(cgl.Qualifier.Uniform, new cgl.VariableSource(new cgl.Type(cgl.Kind.Mat4), 'projection'));

const vertexShader = new cgl.Shader(
    new cgl.Function('main', [
        new cgl.Statement(
            new cgl.EqualAssignment(
                new cgl.Reference(glPosition),
                new cgl.Multiplication(
                    new cgl.Reference(projection),
                    new cgl.Multiplication(
                        new cgl.Reference(modelView),
                        new cgl.Reference(vertexPosition)
                    )
                )
            )
        )
    ]), [], [
        new cgl.VariableDeclaration(vertexPosition),
        new cgl.VariableDeclaration(projection),
        new cgl.VariableDeclaration(modelView)
    ]
);

const fragShader = new cgl.Shader(
    new cgl.Function('main', [
        new cgl.Statement(
            new cgl.EqualAssignment(
                new cgl.Reference(glFragColor),
                new cgl.Reference(colour)
            )
        )
    ]), [], [new cgl.VariableDeclaration(colour)]
);

const pipelineBuilder = new cgl.ShaderPipelineBuilder(vertexShader, fragShader);
const pipeline = pipelineBuilder.build(gl);

const fieldOfView = 45 * Math.PI / 180;
const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
const zNear = 0.1;
const zFar = 100.0;

const projectionMatrix = mat4.create();
mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

const modelViewMatrix = mat4.create();
mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);

function render() {
    pipeline.useProgram();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    pipeline.vertexPosition = [
        1.0, 1.0, 0.0, 1.0,
        -1.0, 1.0, 0.0, 1.0,
        1.0, -1.0, 0.0, 1.0,
        -1.0, -1.0, 0.0, 1.0
    ];
    pipeline.colour = [1.0,  1.0,  1.0,  1.0];
    pipeline.modelView = modelViewMatrix;
    pipeline.projection = projectionMatrix;
    pipeline.draw(4);
}
render();

document.body.addEventListener('mousemove', function(e) {
    const x = (e.clientX - window.innerWidth/2)/(window.innerWidth/2);
    const y = (e.clientY - window.innerHeight/2)/(window.innerHeight/2);

    mat4.identity(modelViewMatrix);
    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, y*Math.PI/3, [1, 0, 0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, x*Math.PI/3, [0, 1, 0]);

    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(render);
    }
});
