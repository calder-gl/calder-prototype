import Expression from '../../expression';
import InterfaceVariable from '../../../interface';
import Set from '../../../util/set';
import Type from '../../../type';
import Kind from '../../../kind';

export default abstract class InfixExpression implements Expression {
    protected lhs: Expression;
    protected rhs: Expression;

    constructor(lhs: Expression, rhs: Expression) {
        if (!(lhs.returnType().checkEquals(new Type(Kind.Int)) || lhs.returnType().checkEquals(new Type(Kind.Float))) ||
            !(rhs.returnType().checkEquals(new Type(Kind.Int)) || rhs.returnType().checkEquals(new Type(Kind.Float)))) {
            throw new TypeError('LHS and RHS must be of type Int or Float.');
        }

        this.lhs = lhs;
        this.rhs = rhs;
    }

    public abstract source(): string;

    public returnType(): Type {
        if (this.lhs.returnType().checkEquals(new Type(Kind.Float)) ||
            this.rhs.returnType().checkEquals(new Type(Kind.Float))) {
            return new Type(Kind.Float);
        }
        return new Type(Kind.Int);
    }
}
