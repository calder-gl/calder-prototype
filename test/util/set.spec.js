import { expect } from 'chai';
import Set from '../../src/util/set';
import Hashable from '../../src/util/hashable';

// Make String implement Hashable
String.prototype.hashCode = function() {
    return this;
};

describe('Set', () => {
    describe('add', () => {
        it('adds to a set', () => {
            const s = new Set(['a']);
            s.add('b');
            expect(s.has('a')).to.be.true;
            expect(s.has('b')).to.be.true;
        });
    });
    describe('addAll', () => {
        it('adds multiple to a set', () => {
            const s = new Set(['a']).addAll(['b', 'c']);
            expect(s.has('a')).to.be.true;
            expect(s.has('b')).to.be.true;
            expect(s.has('c')).to.be.true;
        });
    });
    describe('delete', () => {
        it('removed from a set', () => {
            expect(new Set(['a']).delete('a').has('a')).to.be.false;
        });
    });
    describe('deleteAll', () => {
        it('removes multiple to a set', () => {
            const s = new Set(['a', 'b', 'c']).deleteAll(['b', 'c']);
            expect(s.has('a')).to.be.true;
            expect(s.has('b')).to.be.false;
            expect(s.has('c')).to.be.false;
        });
    });
    describe('isSuperset', () => {
        it('works for a superset', () => {
            expect(new Set(['a', 'b']).isSuperset(new Set(['a']))).to.be.true;
        });
        it('works for an equal set', () => {
            expect(new Set(['a']).isSuperset(new Set(['a']))).to.be.true;
        });
        it('does not work for a subset', () => {
            expect(new Set([]).isSuperset(new Set(['a']))).to.be.false;
        });
    });
    describe('isSubset', () => {
        it('works for a subset', () => {
            expect(new Set(['a']).isSubset(new Set(['a', 'b']))).to.be.true;
        });
        it('works for an equal set', () => {
            expect(new Set(['a']).isSubset(new Set(['a']))).to.be.true;
        });
        it('does not work for a superset', () => {
            expect(new Set(['a', 'b']).isSubset(new Set(['a']))).to.be.false;
        });
    });
    describe('isStrictSuperset', () => {
        it('works for a superset', () => {
            expect(new Set(['a', 'b']).isStrictSuperset(new Set(['a']))).to.be.true;
        });
        it('does not work for an equal set', () => {
            expect(new Set(['a']).isStrictSuperset(new Set(['a']))).to.be.false;
        });
        it('does not work for a subset', () => {
            expect(new Set([]).isStrictSuperset(new Set(['a']))).to.be.false;
        });
    });
    describe('isStrictSubset', () => {
        it('works for a subset', () => {
            expect(new Set(['a']).isStrictSubset(new Set(['a', 'b']))).to.be.true;
        });
        it('does not work for an equal set', () => {
            expect(new Set(['a']).isStrictSubset(new Set(['a']))).to.be.false;
        });
        it('does not work for a superset', () => {
            expect(new Set(['a', 'b']).isStrictSubset(new Set(['a']))).to.be.false;
        });
    });
    describe('union', () => {
        it('combines the terms from both', () => {
            const s = new Set(['a', 'b']).union(new Set(['c', 'd']));
            expect(s.has('a')).to.be.true;
            expect(s.has('b')).to.be.true;
            expect(s.has('c')).to.be.true;
            expect(s.has('d')).to.be.true;
        });
    });
    describe('intersection', () => {
        it('keeps only common terms', () => {
            const s = new Set(['a', 'b']).intersection(new Set(['b', 'c']));
            expect(s.has('b')).to.be.true;
            expect(s.length).to.equal(1);
        });
    });
});
