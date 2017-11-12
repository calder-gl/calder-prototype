import Expression from '../../expression';
import InfixExpression from './infix_expression'
import Kind from '../../../kind';
import Type from '../../../type';

export default class Modulo extends InfixExpression {
    constructor(lhs: Expression, rhs: Expression) {
        super(lhs, rhs);

        if (!super.bothSidesIntType()) throw new TypeError('LHS and RHS must be of type Int.');
    }

    public source(): string {
        return `${this.lhs.source()} % ${this.rhs.source()}`;
    }
}
