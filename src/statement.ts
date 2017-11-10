import SyntaxNode from './syntaxnode';
import Variable from './variable';
import Set from './util/set';

export default class Statement implements SyntaxNode {
    private node: SyntaxNode;

    constructor(node: SyntaxNode) {
        this.node = node;
    }

    public dependencies(): Set<Variable> {
        return this.node.dependencies();
    }

    public source(): string {
        return `${this.node.source()};`;
    }
}
