import InterfaceVariable from './interfacevariable';
import Set from './util/set';
import SyntaxNode from './syntaxnode';

export default class Statement implements SyntaxNode {
    private node: SyntaxNode;

    constructor(node: SyntaxNode) {
        this.node = node;
    }

    public dependencies(): Set<InterfaceVariable> {
        return this.node.dependencies();
    }

    public source(): string {
        return `${this.node.source()};`;
    }
}
