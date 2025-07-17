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

  #array = [];

  constructor(array) {
    if (!Array.isArray(array)) {
      throw new Error('Tree instance requires array');
    }
    this.#array = array;
  }

  //public interface
  isTree() {
    if (!this._root) {
      return false;
    }

    const NodeClass = this.constructor._Node;
    let isThisATree = false;
    let nodeCount = 0;
    /*
    requirements:
    more than 1 node.
    nodes are an instance of Node class
    */
    let currentNode = this._root;
    (function checkoutNode(currentNode) {
      if (currentNode instanceof NodeClass) {
        console.log('wasnode');
        nodeCount++;
        currentNode.left ? checkoutNode(currentNode.left) : null;
        currentNode.right ? checkoutNode(currentNode.right) : null;
      }
    })(this._root);

    if (nodeCount > 1) {
      isThisATree = true;
    }

    return isThisATree;
  }

  //private interface
  _root = null;

  _mergeSort(arr) {
    return mergeSort(arr);
  }
}
export { Tree };
