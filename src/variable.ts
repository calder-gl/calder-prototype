import VariableSource from './variablesource';
import Type from './type';
import Hashable from './util/hashable';

export default class Variable implements Hashable {
    public readonly variableSrc: VariableSource;

    constructor(variableSrc: VariableSource) {
        this.variableSrc = variableSrc;
    }

    public declaration(): string {
        return this.variableSrc.declaration();
    }

    public name(): string {
        return this.variableSrc.srcName;
    }

    public type(): Type {
        return this.variableSrc.srcType;
    }

    public hashCode(): string {
        return this.declaration();
    }

    public wrapAttributeBufferInTypedArray(value: any[]): any {
        return this.type().wrapAttributeBufferInTypedArray(value);
    }

    public glType(gl: WebGLRenderingContext): GLenum {
        return this.type().glType(gl);
    }

    public size(): GLsizei {
        return this.type().size();
    }

    public setUniform(gl: WebGLRenderingContext, position: WebGLUniformLocation, value: any[]) {
        return this.type().setUniform(gl, position, value);
    }
}
