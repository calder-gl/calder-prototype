import BooleanExpression from './boolean_expression';
import Expression from '../expression';
import Type from '../../type';
import Kind from '../../kind';

export default class AndExpression extends BooleanExpression {
    constructor(lhs: Expression, rhs: Expression) {
        super(lhs, rhs);

        // TODO: add bool casting
        if (!lhs.returnType().checkEquals(new Type(Kind.Bool)) || !rhs.returnType().checkEquals(new Type(Kind.Bool)))
            throw new TypeError("Not a boolean expression");
    }

    public source(): string {
        return `(${this.lhs.source()} && ${this.rhs.source()})`;
    }
}
