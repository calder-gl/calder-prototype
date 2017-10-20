import { Variable } from './variable';
import SyntaxNode from './syntaxnode';

export default class Function implements SyntaxNode {
    public readonly name: string;
    private statements: SyntaxNode[];

    constructor(name: string, statements: SyntaxNode[] = []) {
        this.name = name;
        this.statements = statements;
    }

    public dependencies(): Set<Variable> {
        return this.statements.reduce(
            (union, statement) => new Set([...union, ...statement.dependencies()]),
            new Set());
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
