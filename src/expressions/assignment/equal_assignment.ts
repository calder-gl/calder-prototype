import AssignmentExpression from './assignment'
import Expression from '../expression';
import Reference from '../../reference';

export default class EqualAssignment extends AssignmentExpression {
    constructor(lhs: Reference, rhs: Expression) {
        super(lhs, rhs);
    }

    public source(): string {
        return `${this.lhs.source()} = ${this.rhs.source()}`;
    }
}
