import { Tree } from '../src/tree';

test('node class constructor exists', () => {
  const node = new Tree._Node({ data: 'data!' });
  expect(node).toBeInstanceOf(Tree._Node);
});

const testNode = new Tree._Node({ data: 'data!' });

test('node has left child', () => {
  expect(testNode.left).toBe(null);
});

test('node has right child', () => {
  expect(testNode.right).toBe(null);
});

test('node has data', () => {
  expect(testNode.data).toBe('data!');
});
