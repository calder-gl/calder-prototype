import Type from './type';
import MetaKind from './metakind';
import Hashable from './util/hashable';

export default class VariableSource implements Hashable {
    public readonly srcName: string;
    public readonly srcType: Type;

    constructor(type: Type, name: string) {
        this.srcType = type;
        this.srcName = name;
    }

    public declaration(): string {
        switch (this.srcType.metakind) {
            case MetaKind.Basic:
            case MetaKind.Struct:
                return `${this.srcType.name} ${this.srcName};`;
            case MetaKind.Array:
                return `${this.srcType.children[0].name} ${this.srcName}[];`;
        }
    }

    public hashCode(): string {
        return this.declaration();
    }
}
