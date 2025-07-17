import { Node } from '../src/node';

test('node class constructor exists', () => {
  expect(Boolean(new Node({ data: 'data!' }))).toBe(true);
});

const testNode = new Node({ data: 'data!' });

test('node has left child', () => {
  expect(testNode.left).toBe(null);
});

test('node has right child', () => {
  expect(testNode.right).toBe(null);
});

test('node has data', () => {
  expect(testNode.data).toBe('data!');
});
