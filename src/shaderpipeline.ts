import Shader from './shader';

export default class ShaderPipeline {
    public readonly vertexSource: string;
    public readonly fragmentSource: string;

    constructor(vertexShader: Shader, fragmentShader: Shader) {
        this.vertexSource = vertexShader.source();    
        this.fragmentSource = fragmentShader.source();    
    }
}
