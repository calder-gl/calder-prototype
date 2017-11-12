import MetaKind from './metakind';
import Kind from './kind';

export default class Type {
    public readonly name: string;
    public readonly metakind: MetaKind;
    public readonly children: Type[];

    constructor(name: string, metakind: MetaKind = MetaKind.Basic, children: Type[] = []) {
        this.name = name;
        this.metakind = metakind;
        this.children = children;

        // TODO: check that:
        // a) metakind == Basic => children == []
        // b) metakind == Array => children == [SomeType]
    }

    public checkEquals(otherType: Type): boolean {
        // Note: for structs, this only verifies that they have the same structure (i.e. same # and types
        // of child types), but doesn't check that the variable names in the struct are identical.

        if (this.name !== otherType.name) return false;
        if (this.metakind !== otherType.metakind) return false;
        if (this.children.length !== otherType.children.length) return false;

        const childrenPairs = this.children.map((child, idx) => [child, otherType.children[idx]]);
        for (const [myChild, otherChild] of childrenPairs) {
            if (!myChild.checkEquals(otherChild)) return false;
        }

        return true;
    }
}
