import Expression from './expressions/expression';
import InterfaceVariable from './interface';
import Reference from './reference';
import Set from './util/set';
import Type from './type';
import Kind from './kind';

export default class Operator implements Expression {
    private lhs: Reference;
    private rhs: Expression;

    // TODO: check that lhs and rhs types match
    constructor(lhs: Reference, rhs: Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }

    public dependencies(): Set<InterfaceVariable> {
        return this.rhs.dependencies().union(this.lhs.dependencies());
    }

    public source(): string {
        return `${this.lhs.source()} = ${this.rhs.source()}`;
    }

    public returnType(): Type {
        return new Type(Kind.Bool);
    }
}
