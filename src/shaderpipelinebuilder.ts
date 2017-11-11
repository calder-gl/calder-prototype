import Shader from './shader';
import Type from './type';
import ShaderPipeline from './shaderpipeline';

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
        const inVars = this.fragmentShader.inputs();
        const outVars = this.vertexShader.outputs();

        this.isWellFormed = outVars.isSuperset(inVars);
    }

    public build(): ShaderPipeline {
        return new ShaderPipeline(this.vertexShader, this.fragmentShader);
    }
}
