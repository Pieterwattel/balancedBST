import { Tree } from '../src/tree';

test('tree is a class', () => {
  expect(Boolean(new Tree([1]))).toBe(true);
});

test('tree has to accept an array', () => {
  expect(() => new Tree()).toThrow('Tree instance requires array');
  expect(() => new Tree([1, 2, 3])).not.toThrow();
});

test('tree has a root attribute', () => {
  expect(testTree).toHaveProperty('_root');
  expect('_root' in testTree).toBe(true);
});

test('tree can run mergeSort', () => {
  expect(testTree._mergeSort([2, 1, 4, 6, 5])).toStrictEqual([1, 2, 4, 5, 6]);
});

const testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test('bst has method isTree', () => {
  const nodeRightRight = new Tree._Node({
    data: 'nodeRightRightData',
    left: null,
    right: null,
  });
  const nodeLeft = new Tree._Node({
    data: 'nodeLeftData',
    left: null,
    right: null,
  });
  const nodeRight = new Tree._Node({
    data: 'nodeRightData',
    left: null,
    right: nodeRightRight,
  });
  const nodeRoot = new Tree._Node({
    data: 'rootNodeData',
    left: nodeLeft,
    right: nodeRight,
  });
  expect(testTree.isTree()).toBe(false);
  testTree._root = nodeRoot;
  expect(testTree.isTree()).toBe(true);
});

test('bst has method buildTree', () => {
  expect(testTree.buildTree([1, 2, 3]).isTree()).toBe(true);
});
