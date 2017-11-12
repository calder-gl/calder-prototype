import Expression from '../../expression';
import InterfaceVariable from '../../../interface';
import Qualifier from '../../../qualifier';
import Reference from '../../../reference';
import Set from '../../../util/set';
import Type from '../../../type';
import Kind from '../../../kind';

export default abstract class UnaryExpression implements Expression {
    protected lhs: Reference;

    constructor(lhs: Reference) {
        if (!lhs.returnType().checkEquals(new Type(Kind.Int)))
            throw new TypeError('Can only perform unary expression on integer type.');
        if (lhs.qualifier == Qualifier.Const)
            throw new TypeError('Can\'t mutate constant variable.');

        this.lhs = lhs;
    }

    public dependencies(): Set<InterfaceVariable> {
        return this.lhs.dependencies();
    }

    public abstract source(): string;

    public returnType(): Type {
        return new Type(Kind.Int);
    }
}
