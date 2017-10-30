import Variable from './variable';

export default interface SyntaxNode {
    dependencies(): Set<Variable>;
    source(): string;
}
