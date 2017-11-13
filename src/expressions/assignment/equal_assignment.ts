import AssignmentExpression from './assignment_expression'
import Expression from '../expression';
import Reference from '../../reference';

export default class EqualAssignment extends AssignmentExpression {
    constructor(lhs: Reference, rhs: Expression) {
        super(lhs, rhs);
    }

    public source(): string {
        console.log(this);
        return `${this.lhs.source()} = ${this.rhs.source()}`;
    }
}
