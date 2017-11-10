import Variable from './variable';
import SyntaxNode from './syntaxnode';
import Statement from './statement';
import Set from './util/set';

export default class Function implements SyntaxNode {
    public readonly name: string;
    private statements: Statement[];

    constructor(name: string, statements: Statement[] = []) {
        this.name = name;
        this.statements = statements;
    }

    public dependencies(): Set<Variable> {
        return this.statements.reduce((union, statement) => (
                union.addAll(statement.dependencies())
            ),
            new Set<Variable>()
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
