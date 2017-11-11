import Expression from './expression';
import InterfaceVariable from '../interface';
import Reference from '../reference';
import Set from '../util/set';
import Type from '../type';

export default class Assignment implements Expression {
    private lhs: Reference;
    private rhs: Expression;

    constructor(lhs: Reference, rhs: Expression) {
        if (lhs.returnType() != rhs.returnType())
            throw new TypeError("Left-hand side and right-hand side do not match types.");

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
        return this.lhs.returnType();
    }
}
