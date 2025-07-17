import { Tree } from '../src/tree';
import { Node } from '../src/node';

test('tree is a class', () => {
  expect(Boolean(new Tree())).toBe(true);
});

test('tree has to accept an array', () => {
  expect(new Tree()).toThrow(true);
  expect(new Tree([1, 2, 3])).toThrow(false);
});

test('tree has a root attribute', () => {
  expect(testTree).toHaveProperty('root');
  expect('root' in testTree).toBe(true);
});

test('tree can run mergeSort', () => {
  expect(testTree._mergeSort([2, 1, 4, 6, 5])).toStrictEqual([1, 2, 4, 5, 6]);
});

const testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test('bst has method isTree', () => {
  const nodeLeft = new Node({
    data: 'nodeLeftData',
    left: null,
    right: null,
  });
  const nodeRoot = new Node({
    data: 'rootNodeData',
    left: nodeLeft,
    right: null,
  });
  testTree.root = nodeRoot;
  expect(testTree.isTree()).toBe(true);
});

test('bst has method buildTree', () => {
  expect(testTree.buildTree([1, 2, 3]).isTree()).toBe(true);
});
