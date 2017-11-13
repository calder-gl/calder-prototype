import Expression from '../../expression';
import InterfaceVariable from '../../../interfacevariable';
import Kind from '../../../kind';
import Set from '../../../util/set';
import Type from '../../../type';
import TypeException from '../../../exceptions/typeexception';

export default abstract class InfixExpression implements Expression {
    protected lhs: Expression;
    protected rhs: Expression;

    constructor(lhs: Expression, rhs: Expression) {
        this.lhs = lhs;
        this.rhs = rhs;

        if (!this.lhs.returnType().checkVectorEquals(rhs.returnType()) &&
            !this.lhs.returnType().checkMatrixEquals(rhs.returnType()) &&
            !this.bothSidesScalarTypes()) {
            //throw new TypeException('LHS and RHS must be of type Int, Float, or same size vector/matrix.');
        }
    }

    public abstract source(): string;

    public returnType(): Type {
        if (this.atLeastOneSideFloatType()) return new Type(Kind.Float);
        return this.lhs.returnType();
    }

    // Type Checking Helper Methods

    protected eitherSideVectorOrMatrix(lhs: Expression, rhs: Expression) {
        return this.lhs.returnType().isVectorType() || this.rhs.returnType().isVectorType()
            || this.lhs.returnType().isMatrixType() || this.rhs.returnType().isMatrixType();
    }

    protected bothSidesScalarTypes(): boolean {
        return (this.lhs.returnType().isScalarType()) && (this.rhs.returnType().isScalarType());
    }

    protected atLeastOneSideFloatType(): boolean {
        return this.lhs.returnType().checkEquals(new Type(Kind.Float)) || this.rhs.returnType().checkEquals(new Type(Kind.Float));
    }

    protected bothSidesIntType(): boolean {
        return this.lhs.returnType().checkEquals(new Type(Kind.Int)) && (this.rhs.returnType().checkEquals(new Type(Kind.Int)));
    }
}
