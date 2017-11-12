import Shader from './shader';
import Type from './type';
import ShaderPipeline from './shaderpipeline';
import Variable from './variable';
import Set from './util/set';

export default class ShaderPipelineBuilder {
    public isWellFormed: boolean;
    private readonly vertexShader: Shader;
    private readonly fragmentShader: Shader;

    constructor(vertexShader: Shader, fragmentShader: Shader) {
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;

        // TODO: replace with throwing an exception

        // Vertex shader outputs must be a superset of fragment shader inputs.
        // Might want to enforce equality (need to check the standard), but for now, this should be sufficient.
        const inVars = new Set<Variable>([...this.fragmentShader.inputs()].map(v => v.variable));
        const outVars = new Set<Variable>([...this.vertexShader.outputs()].map(v => v.variable));

        this.isWellFormed = outVars.isSuperset(inVars);
    }

    public build(gl: WebGLRenderingContext): ShaderPipeline {
        return new ShaderPipeline(gl, this.vertexShader, this.fragmentShader);
    }
}
