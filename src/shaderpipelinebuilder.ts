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

        // Sort the inputs and outputs to ensure we can efficiently do a subset comparison. Equality doesn't
        // work because we want to compare fields, so Set.has() doesn't work.
        const compareVars = (a: { kind: Type, name: string }, b: { kind: Type, name: string }) => {
            if (a.kind < b.kind) {
                return -1;
            } else if (b.kind < b.kind) {
                return 1;
            } else {
                if (a.kind < b.kind) return -1;
                else if (b.kind < a.kind) return 1;
                else return 0;
            }
        };
        const inVars = this.fragmentShader.inputs().sort(compareVars);
        const outVars = this.vertexShader.outputs().sort(compareVars);

        let inIdx = 0;
        for (let outIdx = 0; outIdx < outVars.length && inIdx < inVars.length; outIdx++) {
            if (inVars[inIdx].kind == outVars[outIdx].kind && inVars[inIdx].name == outVars[outIdx].name) {
                inIdx++;
            }
        }

        if (inIdx < inVars.length) {
            this.isWellFormed = false;
        }
    }

    public build(): ShaderPipeline {
        return new ShaderPipeline(this.vertexShader, this.fragmentShader);
    }
}
