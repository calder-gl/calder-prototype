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
        this.isWellFormed = true;
        if (this.vertexShader.outputs().length < this.fragmentShader.inputs().length) {
            this.isWellFormed = false;
        }

        const inTypes = this.fragmentShader.inputs().sort();
        const outTypes = this.vertexShader.outputs().sort();

        let inIdx = 0;
        for (let outIdx = 0; outIdx < outTypes.length && inIdx < inTypes.length; outIdx++) {
            if (inTypes[inIdx] == outTypes[outIdx]) {
                inIdx++;
            }
        }

        if (inIdx < inTypes.length) {
            this.isWellFormed = false;
        }
    }

    public build(): ShaderPipeline {
        return new ShaderPipeline(this.vertexShader, this.fragmentShader);
    }
}
