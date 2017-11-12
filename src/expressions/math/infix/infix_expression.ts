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

        if (!this.bothSameSizeVectors() && !this.bothSameSizeMatrices() && !this.bothSidesScalarTypes()) {
            throw new TypeException('LHS and RHS must be of type Int, Float, or same size vector/matrix.');
        }
    }

    public abstract source(): string;

    public returnType(): Type {
        if (this.atLeastOneSideFloatType()) return new Type(Kind.Float);
        return this.lhs.returnType();
    }

    protected vectorType(value: Expression): boolean {
        return value.returnType().checkEquals(new Type(Kind.Vec2))
            || value.returnType().checkEquals(new Type(Kind.Vec3))
            || value.returnType().checkEquals(new Type(Kind.Vec4))
            || value.returnType().checkEquals(new Type(Kind.BVec2))
            || value.returnType().checkEquals(new Type(Kind.BVec3))
            || value.returnType().checkEquals(new Type(Kind.BVec4))
            || value.returnType().checkEquals(new Type(Kind.IVec2))
            || value.returnType().checkEquals(new Type(Kind.IVec3))
            || value.returnType().checkEquals(new Type(Kind.IVec4));
    }

    protected matrixType(value: Expression): boolean {
        return value.returnType().checkEquals(new Type(Kind.Mat2))
            || value.returnType().checkEquals(new Type(Kind.Mat3))
            || value.returnType().checkEquals(new Type(Kind.Mat4));
    }

    protected anySideVectorOrMatrix(lhs: Expression, rhs: Expression) {
        return this.vectorType(lhs) || this.vectorType(rhs)
            || this.matrixType(lhs) || this.matrixType(rhs);
    }

    protected bothSameSizeVectors(): boolean {
        return (this.lhs.returnType().checkEquals(new Type(Kind.Vec2)) && this.rhs.returnType().checkEquals(new Type(Kind.Vec2)))
            || (this.lhs.returnType().checkEquals(new Type(Kind.Vec3)) && this.rhs.returnType().checkEquals(new Type(Kind.Vec3)))
            || (this.lhs.returnType().checkEquals(new Type(Kind.Vec4)) && this.rhs.returnType().checkEquals(new Type(Kind.Vec4)))
            || (this.lhs.returnType().checkEquals(new Type(Kind.BVec2)) && this.rhs.returnType().checkEquals(new Type(Kind.BVec2)))
            || (this.lhs.returnType().checkEquals(new Type(Kind.BVec3)) && this.rhs.returnType().checkEquals(new Type(Kind.BVec3)))
            || (this.lhs.returnType().checkEquals(new Type(Kind.BVec4)) && this.rhs.returnType().checkEquals(new Type(Kind.BVec4)))
            || (this.lhs.returnType().checkEquals(new Type(Kind.IVec2)) && this.rhs.returnType().checkEquals(new Type(Kind.IVec2)))
            || (this.lhs.returnType().checkEquals(new Type(Kind.IVec3)) && this.rhs.returnType().checkEquals(new Type(Kind.IVec3)))
            || (this.lhs.returnType().checkEquals(new Type(Kind.IVec4)) && this.rhs.returnType().checkEquals(new Type(Kind.IVec4)));
    }

    protected bothSameSizeMatrices(): boolean {
        return (this.lhs.returnType().checkEquals(new Type(Kind.Mat2)) && this.rhs.returnType().checkEquals(new Type(Kind.Mat2)))
            || (this.lhs.returnType().checkEquals(new Type(Kind.Mat3)) && this.rhs.returnType().checkEquals(new Type(Kind.Mat3)))
            || (this.lhs.returnType().checkEquals(new Type(Kind.Mat4)) && this.rhs.returnType().checkEquals(new Type(Kind.Mat4)));
    }

    protected bothSidesScalarTypes(): boolean {
        return (this.lhs.returnType().checkEquals(new Type(Kind.Int)) || this.lhs.returnType().checkEquals(new Type(Kind.Float)))
            && (this.rhs.returnType().checkEquals(new Type(Kind.Int)) || this.rhs.returnType().checkEquals(new Type(Kind.Float)));
    }

    protected atLeastOneSideFloatType(): boolean {
        return this.lhs.returnType().checkEquals(new Type(Kind.Float)) || this.rhs.returnType().checkEquals(new Type(Kind.Float));
    }

    protected bothSidesIntType(): boolean {
        return this.lhs.returnType().checkEquals(new Type(Kind.Int)) && (this.rhs.returnType().checkEquals(new Type(Kind.Int)));
    }
}
