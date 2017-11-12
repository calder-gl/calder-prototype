import InfixExpression from './infix_expression'
import Expression from '../../expression';

export default class Multiplication extends InfixExpression {
    constructor(lhs: Expression, rhs: Expression) {
        super(lhs, rhs);
    }

    public source(): string {
        return `${this.lhs.source()} * ${this.rhs.source()}`;
    }
}
