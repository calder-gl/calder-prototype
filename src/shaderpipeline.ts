import InterfaceVariable from './interfacevariable';
import Qualifier from './qualifier';
import Set from './util/set';
import Shader from './shader';

export default class ShaderPipeline {
    private readonly gl: WebGLRenderingContext;
    public program: WebGLProgram;
    private attributePositions: Map<String, GLint>;
    private attributeBuffers: Map<String, WebGLBuffer>;
    private uniformPositions: Map<String, WebGLUniformLocation>;
    private attributes: Map<String, InterfaceVariable>;
    private uniforms: Set<InterfaceVariable>;

    constructor(gl: WebGLRenderingContext, vertexShader: Shader, fragmentShader: Shader) {
        this.gl = gl;
        this.attributePositions = new Map();
        this.attributeBuffers = new Map();
        this.uniformPositions = new Map();
        this.attributes = new Map();
        vertexShader.inputDecls
            .filter(input => input.variable.qualifier == Qualifier.Attribute)
            .forEach(input => this.attributes.set(input.variable.name(), input.variable));
        this.uniforms = new Set(
            [...vertexShader.inputDecls]
                .filter(input => input.variable.qualifier == Qualifier.Uniform)
                .map(input => input.variable)
        );

        this.compileProgram(vertexShader, fragmentShader);
        this.createBuffers();
    }

    public setAttribute(input: string, value: any[], usage: GLenum = this.gl.STATIC_DRAW) {
        const interfaceVariable = this.attributes.get(input);
        if (!interfaceVariable) {
            throw new Error(`Unkown input: ${input}`);
        }

        const buffer = this.attributeBuffers.get(input);
        if (!buffer) {
            throw new Error(`${input} is not an attribute`);
        }

        const position = this.attributePositions.get(input);
        if (!position) {
            throw new Error(`${input} is not an attribute`);
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, interfaceVariable.wrapAttributeBufferInTypedArray(value), usage);
        this.gl.vertexAttribPointer(
            position,
            interfaceVariable.size(),
            interfaceVariable.glType(this.gl),
            false, // TODO: support normalization
            0, // TODO: support nonzero stride
            0 // TODO: support nonzero offset
        );
        this.gl.enableVertexAttribArray(position);
    }

    // TODO: support variadic args
    public setUniform(input: string, value: any[]) {
        const interfaceVariable = this.attributes.get(input);
        if (!interfaceVariable) {
            throw new Error(`Unkown input: ${input}`);
        }

        const position = this.uniformPositions.get(input);
        if (!position) {
            throw new Error(`${input} is not a uniform`);
        }

        interfaceVariable.setUniform(this.gl, position, value);
    }

    public useProgram() {
        this.gl.useProgram(this.program);
    }

    public draw(vertices: GLint, offset: GLint = 0) {
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertices);
    }

    private compileProgram(vertexShader: Shader, fragmentShader: Shader) {
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
    }

    private compileShader(source: string, type: GLint): WebGLShader {
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

    private createBuffers() {
        [...this.uniforms].forEach(uniform => {
            const position = this.gl.getUniformLocation(this.program, uniform.name());
            if (position === null) {
                throw new Error(`Unable to find uniform position for ${uniform.name()}`);
            }
            this.uniformPositions.set(uniform.name(), position);
        });
        [...this.attributes.values()].forEach(attribute => {
            this.attributePositions.set(attribute.name(), this.gl.getAttribLocation(this.program, attribute.name()));
            this.attributeBuffers.set(attribute.name(), this.makeBuffer());
        });
    }

    private makeBuffer(): WebGLBuffer {
        const buffer = this.gl.createBuffer();
        if (buffer === null) {
            throw new Error('Error creating buffer');
        }

        return buffer;
    }
}
