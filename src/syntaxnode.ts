import InterfaceVariable from './interface';
import Set from './util/set';

export default interface SyntaxNode {
    dependencies(): Set<InterfaceVariable>;
    source(): string;
}
