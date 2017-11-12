import UnaryExpression from './unary_expression'
import Expression from '../../expression';
import Reference from '../../../reference';

export default class PrefixDecrement extends UnaryExpression {
    constructor(lhs: Reference) {
        super(lhs);
    }

    public source(): string {
        return `--${this.lhs.source()}`;
    }
}
