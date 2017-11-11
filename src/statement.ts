import Interface from './interface';
import Set from './util/set';
import SyntaxNode from './syntaxnode';

export default class Statement implements SyntaxNode {
    private node: SyntaxNode;

    constructor(node: SyntaxNode) {
        this.node = node;
    }

    public dependencies(): Set<Interface> {
        return this.node.dependencies();
    }

    public source(): string {
        return `${this.node.source()};`;
    }
}
