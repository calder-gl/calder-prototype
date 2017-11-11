import InterfaceVariable from './interface';
import Set from './util/set';
import Statement from './statement';
import SyntaxNode from './syntaxnode';

export default class Function implements SyntaxNode {
    public readonly name: string;
    private statements: Statement[];

    constructor(name: string, statements: Statement[] = []) {
        this.name = name;
        this.statements = statements;
    }

    public dependencies(): Set<InterfaceVariable> {
        return this.statements.reduce((union, statement) => (
                union.addAll(statement.dependencies())
            ),
            new Set<InterfaceVariable>()
        );
    }

    public source(): string {
        // TODO: allow more than void()
        return `void ${this.name}() {\n` +
            this.statements
                .map(statement => statement.source())
                .join('\n') +
            '\n}';
    }
}
