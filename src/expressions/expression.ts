import Type from '../type';
import SyntaxNode from '../syntaxnode';

export default interface Expression extends SyntaxNode {
    returnType(): Type;
}
