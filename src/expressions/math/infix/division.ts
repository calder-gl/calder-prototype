import InfixExpression from './infix_expression'
import Expression from '../../expression';
import TypeException from '../../../exceptions/typeexception';

export default class Division extends InfixExpression {
    constructor(lhs: Expression, rhs: Expression) {
        super(lhs, rhs);

        if (super.anySideVectorOrMatrix(lhs, rhs)) {
            throw new TypeException('LHS and RHS must be of type Int or Float.');
        }
    }

    public source(): string {
        return `${this.lhs.source()} / ${this.rhs.source()}`;
    }
}
