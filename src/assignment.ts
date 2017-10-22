import Expression from './expression';
import Variable from './variable';
import Type from './type';
import Reference from './reference';

export default class Assignment implements Expression {
    private lhs: Reference;
    private rhs: Expression;

    // TODO: check that lhs and rhs types match
    constructor(lhs: Reference, rhs: Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }

    public dependencies(): Set<Variable> {
        return new Set([...this.rhs.dependencies(), ...this.lhs.dependencies()]);
    }

    public source(): string {
        return `${this.lhs.source()} = ${this.rhs.source()}`;
    }

    public returnType(): Type {
        return this.lhs.returnType();
    }
}
