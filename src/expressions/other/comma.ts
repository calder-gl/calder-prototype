import Expression from '../expression';
import InterfaceVariable from '../../interface';
import Reference from '../../reference';
import Set from '../../util/set';
import Type from '../../type';
import Kind from '../../kind';

export default class Comma implements Expression {
    protected lhs: Reference;
    protected rhs: Reference;

    constructor(lhs: Reference, rhs: Reference) {
        if (!lhs.returnType().checkEquals(rhs.returnType()))
            throw new TypeError("Left-hand side and right-hand side do not match types.");

        this.lhs = lhs;
        this.rhs = rhs;
    }

    public dependencies(): Set<InterfaceVariable> {
        return this.rhs.dependencies().union(this.lhs.dependencies());
    }

    public source(): string {
        return `${this.lhs.source()}, ${this.rhs.source()}`;
    }

    public returnType(): Type {
        return this.lhs.returnType();
    }
}
