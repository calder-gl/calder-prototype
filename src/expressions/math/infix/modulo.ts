import Expression from '../../expression';
import InfixExpression from './infix_expression'
import Kind from '../../../kind';
import Type from '../../../type';

export default class Modulo extends InfixExpression {
    constructor(lhs: Expression, rhs: Expression) {
        if (!lhs.returnType().checkEquals(new Type(Kind.Int)) || !(rhs.returnType().checkEquals(new Type(Kind.Int)))) {
            throw new TypeError('LHS and RHS must be of type Int.');
        }
        super(lhs, rhs);
    }

    public source(): string {
        return `${this.lhs.source()} % ${this.rhs.source()}`;
    }
}
