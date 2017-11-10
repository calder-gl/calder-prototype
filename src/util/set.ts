import Hashable from './hashable';

export default class Set<T extends Hashable> implements Iterable<T> {
    private map: Map<string, T>;
    public length: number;

    constructor(iterable: Iterable<T> = []) {
        this.map = new Map<string, T>();
        this.length = 0;

        this.addAll(iterable);
    }

    public [Symbol.iterator](): Iterator<T> {
        return this.values();
    }

    public add(item: T): Set<T> {
        this.map.set(item.hashCode(), item);
        this.length = this.map.size;
        return this;
    }

    public addAll(items: Iterable<T>): Set<T> {
        for (let i of items) {
            this.add(i);
        }
        return this;
    }

    public delete(item: T): Set<T> {
        this.map.delete(item.hashCode());
        this.length = this.map.size;
        return this;
    }

    public deleteAll(items: Iterable<T>): Set<T> {
        for (let item of items) {
            this.delete(item);
        }
        return this;
    }

    public has(item: T): boolean {
        return this.map.has(item.hashCode());
    }

    public values(): Iterator<T> {
        return this.map.values();
    }

    public keys(): Iterator<string> {
        return this.map.keys();
    }

    public entries(): IterableIterator<[string, T]> {
        return this.map.entries();
    }

    public isSuperset(subset: Set<T>): boolean {
        for (let elem of subset) {
            if (!this.has(elem)) {
                return false;
            }
        }
        return true;
    }

    public isSubset(superset: Set<T>): boolean {
        for (let elem of this) {
            if (!superset.has(elem)) {
                return false;
            }
        }
        return true;
    }

    public isStrictSuperset(subset: Set<T>): boolean {
        return this.isSuperset(subset) && this.length > subset.length;
    }

    public isStrictSubset(superset: Set<T>): boolean {
        return this.isSubset(superset) && this.length < superset.length;
    }

    public union(other: Set<T>): Set<T> {
        return new Set(this).addAll(other);
    }

    public intersection(other: Set<T>): Set<T> {
        return new Set([...this].filter(i => other.has(i)));
    }
}
