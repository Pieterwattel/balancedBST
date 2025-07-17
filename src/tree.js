import { mergeSort } from './mergeSort';
import { Node } from './node';

class Tree {
  static _Node = class {
    constructor(dataObj) {
      this.data = dataObj.data || null;
      this.left = dataObj.left || null;
      this.right = dataObj.right || null;
    }
  };

  root = null;
  #array = [];

  constructor(array) {
    if (!Array.isArray(array)) {
      throw new Error('Tree instance requires array');
    }
    this.#array = array;
  }

  //public interface
  isTree() {
    let isThisATree = false;
    let nodeAmount = 0;
    /*
    requirements:
    more than 1 node.
    nodes are an instance of Node class
    */
    let currentNode = this.root;
    (function checkoutNode(currentNode) {
      if (currentNode instanceof Node) {
        console.log('wasnode');
        nodeAmount++;
        currentNode.left ? checkoutNode(currentNode.left) : null;
        currentNode.right ? checkoutNode(currentNode.right) : null;
      }
    })();

    if (nodeAmount > 1) {
      isThisATree = true;
    }

    return isThisATree;
  }

  //private interface
  _mergeSort(arr) {
    return mergeSort(arr);
  }
}
export { Tree };
