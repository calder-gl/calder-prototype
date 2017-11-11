import Interface from './interface';
import Set from './util/set';

export default interface SyntaxNode {
    dependencies(): Set<Interface>;
    source(): string;
}
