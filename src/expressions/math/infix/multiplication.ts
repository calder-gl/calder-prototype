import InfixExpression from './infix_expression'
import Expression from '../../expression';
import TypeException from '../../../exceptions/typeexception';

export default class Multiplication extends InfixExpression {
    constructor(lhs: Expression, rhs: Expression) {
        super(lhs, rhs);

        if (!super.bothSameSizeMatrices() && super.eitherSideVectorOrMatrix(lhs, rhs)) {
            throw new TypeException('LHS and RHS must be of type Int, Float, or both sides must be same size matrices.');
        }
    }

    public source(): string {
        return `${this.lhs.source()} * ${this.rhs.source()}`;
    }
}
