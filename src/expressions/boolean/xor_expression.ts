import BooleanExpression from './boolean_expression';
import Expression from '../expression';

export default class XorExpression extends BooleanExpression {
    constructor(lhs: Expression, rhs: Expression) {
        super(lhs, rhs);
    }

    public source(): string {
        return `(${this.lhs.source()} ^^ ${this.rhs.source()})`;
    }
}
