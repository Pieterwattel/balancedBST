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

test('tree can sort array', () => {
  expect(testTree._sortArray([2, 1, 4, 6, 5])).toStrictEqual([1, 2, 4, 5, 6]);
});

const testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test('bst has method isTree', () => {
  const nodeRightRight = new testTree._Node({
    data: 'nodeRightRightData',
    left: null,
    right: null,
  });
  const nodeLeft = new testTree._Node({
    data: 'nodeLeftData',
    left: null,
    right: null,
  });
  const nodeRight = new testTree._Node({
    data: 'nodeRightData',
    left: null,
    right: nodeRightRight,
  });
  const nodeRoot = new testTree._Node({
    data: 'rootNodeData',
    left: nodeLeft,
    right: nodeRight,
  });
  expect(testTree.isTree()).toBe(false);
  testTree._root = nodeRoot;
  expect(testTree.isTree()).toBe(true);
});

test('bst has method buildTree', () => {
  testTree.buildTree(['a', 'b', 'c', 'd', 'e']);
  expect(testTree.isTree()).toBe(true);
});

test('bst has a clear function', () => {
  testTree.buildTree([1, 2, 3, 5, 9, 20, 6, 21, 8]);
  testTree.clear();
  expect(testTree.isTree()).toBe(false);
});

// vvv advanced functions tests vvv

test('can find node by value', () => {
  testTree.buildTree([1, 2, 3]);
  testTree.getTreeOverview();

  expect(testTree.find(2)).toBeInstanceOf(testTree._Node);
  expect(testTree.find(2).data).toBe(2);
  expect(testTree.find(4)).toBe(undefined);
  expect(testTree.find(1)).toBeInstanceOf(testTree._Node);
  expect(testTree.find(1).data).toBe(1);
});

test('insert method', () => {
  testTree.buildTree([1, 2]);
  testTree.insert(4);

  expect(testTree.find(1)).toBeInstanceOf(testTree._Node);
  expect(testTree.find(1).data).toBe(1);

  expect(testTree.find(3)).toBe(undefined);

  expect(testTree.find(4).data).toBe(4);
  expect(testTree.find(4)).toBeInstanceOf(testTree._Node);
});

test('deleteNode method', () => {
  testTree.buildTree([1, 2, 3, 4]);
  testTree.getTreeOverview();

  expect(testTree.find(4).data).toBe(4);
  testTree.deleteNode(4);
  expect(testTree.find(4)).toBe(undefined);
  expect(testTree.find(3).data).toBe(3);
  expect(testTree.find(2).data).toBe(2);
  expect(testTree.find(1).data).toBe(1);

  testTree.deleteNode(3);
  expect(testTree.find(3)).toBe(undefined);
  testTree.deleteNode(2);
  expect(testTree.find(2)).toBe(undefined);
  expect(testTree.find(1).data).toBe(1);
});
