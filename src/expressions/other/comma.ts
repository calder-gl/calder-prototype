import Expression from '../expression';
import Reference from '../../reference';
import Set from '../../util/set';
import Type from '../../type';
import Kind from '../../kind';

export default class Comma implements Expression {
    protected lhs: Reference;
    protected rhs: Expression;

    constructor(lhs: Reference, rhs: Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }

    public source(): string {
        return `${this.lhs.source()}, ${this.rhs.source()}`;
    }

    public returnType(): Type {
        return this.rhs.returnType();
    }
}
