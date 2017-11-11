import Expression from '../expression';
import InterfaceVariable from '../../interface';
import Reference from '../../reference';
import Set from '../../util/set';
import Type from '../../type';

export default class OrExpression implements Expression {
    private lhs: Expression;
    private rhs: Expression;

    constructor(lhs: Expression, rhs: Expression) {
        // TODO: add bool casting
        if (lhs.returnType() != Type.Bool || rhs.returnType() != Type.Bool)
            throw new TypeError("Not a boolean expression");

        this.lhs = lhs;
        this.rhs = rhs;
    }

    public dependencies(): Set<InterfaceVariable> {
        return this.rhs.dependencies().union(this.lhs.dependencies());
    }

    public source(): string {
        return `(${this.lhs.source()} || ${this.rhs.source()})`;
    }

    public returnType(): Type {
        return Type.Bool;
    }
}
