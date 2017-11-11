import BooleanExpression from './boolean_expression';
import Expression from '../expression';
import Type from '../../type';

export default class AndExpression extends BooleanExpression {
    constructor(lhs: Expression, rhs: Expression) {
        super(lhs, rhs);

        // TODO: add bool casting
        if (lhs.returnType() != Type.Bool || rhs.returnType() != Type.Bool)
            throw new TypeError("Not a boolean expression");
    }

    public source(): string {
        return `(${this.lhs.source()} && ${this.rhs.source()})`;
    }
}
