import { mergeSort } from './mergeSort';
import { Node } from './node';

class Tree {
  #array = [];

  constructor(array) {
    if (!Array.isArray(array)) {
      throw new Error('Tree instance requires array');
    }
    this.#array = array;
  }

  //public interface
  isTree() {
    if (!this._root) return false;

    const NodeClass = this.constructor._Node;
    let nodeCount = 0;
    /*
    requirements:npm run 
    more than 1 node.
    nodes are an instance of Node class
    */
    let currentNode = this._root;
    const checkoutNode = (currentNode) => {
      if (currentNode instanceof this._Node) {
        console.log(currentNode.data + " was a node")
        nodeCount++;
        currentNode.left ? checkoutNode(currentNode.left) : null;
        currentNode.right ? checkoutNode(currentNode.right) : null;
      }
    };

    checkoutNode(this._root);
    return nodeCount > 1;
  }

  buildTree(arr) {
    let sortedArr = this._sortArray(arr);

    let splitArrFromMiddle = function (arr) {
      if (arr.length === 0) {
        return null;
      }

      let midIndex = Math.ceil((arr.length-1) / 2);
      let left = arr.slice(0, midIndex)? arr.slice(0, midIndex):null;
      let right = arr.slice((midIndex+1)) ? arr.slice((midIndex+1)):null;
4
      return { midVal: arr[midIndex], left, right, midIndex };
    };

    const doBuildTree = (arr) => {
      const splitArr = splitArrFromMiddle(arr);

      const leftArr = splitArr.left;
      const midVal = splitArr.midVal;
      const rightArr = splitArr.right;


      let leftMid = null;
      let rightMid = null;

      leftArr.length > 0 ? (leftMid = doBuildTree(leftArr)) : null;

      rightArr.length > 0 ? (rightMid = doBuildTree(rightArr)) : null;

      const node = new this._Node({
        data: midVal,
        left: leftMid,
        right: rightMid,
      });
      return node;
    };

    const rootNode = doBuildTree(sortedArr);
    this._root = rootNode
    return rootNode
  }

  //private interface
  _root = null;

  _sortArray(arr) {
    return mergeSort(arr);
  }
}

Tree.prototype._Node = class {
  constructor(dataObj) {
    this.data = dataObj.data || null;
    this.left = dataObj.left || null;
    this.right = dataObj.right || null;
  }
};

export { Tree };
