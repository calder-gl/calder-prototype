import Shader from './shader';
import Qualifier from './qualifier';

export default class ShaderPipeline {
    private readonly gl: WebGLRenderingContext;
    public program: WebGLProgram;
    private attributePositions: Map<String, GLint>;
    private uniformPositions: Map<String, WebGLUniformLocation>;

    constructor(gl: WebGLRenderingContext, vertexShader: Shader, fragmentShader: Shader) {
        this.gl = gl;

        const program = this.gl.createProgram();
        if (program === null) {
            throw new Error('Error initializing shader program');
        }
        this.program = program;

        this.gl.attachShader(
            this.program,
            this.compileShader(vertexShader.source(), this.gl.VERTEX_SHADER)
        );
        this.gl.attachShader(
            this.program,
            this.compileShader(fragmentShader.source(), this.gl.FRAGMENT_SHADER)
        );

        this.gl.linkProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            const message = this.gl.getProgramInfoLog(this.program);
            throw new Error(`Unable to initialize the shader program: ${message}`);
        }

        this.attributePositions = new Map();
        [...vertexShader.inputs().union(fragmentShader.inputs())].forEach(input => {
            switch (input.qualifier) {
                case Qualifier.Attribute: {
                    this.attributePositions.set(input.name, this.gl.getAttribLocation(this.program, input.name));
                    break;
                }
                case Qualifier.Uniform: {
                    const position = this.gl.getUniformLocation(this.program, input.name);
                    if (position === null) {
                        throw new Error(`Unable to find uniform position for ${input.name}`);
                    }
                    this.uniformPositions.set(input.name, position);
                    break;
                }
            }
        });
    }

    private compileShader(source: string, type: number): WebGLShader {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            const message = this.gl.getShaderInfoLog(shader);
            this.gl.deleteShader(shader);
            throw new Error(`An error occurred compiling the shaders: ${message}`);
        }

        if (shader === null) {
            throw new Error('Could not compile shader');
        }

        return shader;
    }
}
