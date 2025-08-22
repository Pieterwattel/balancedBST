import { mergeSort } from './mergeSort';
import { Node } from './node';

class Tree {
  #array = [];
  #i = 0;

  constructor(array) {
    if (!Array.isArray(array)) {
      throw new Error('Tree instance requires array');
    }
    this.#array = array;
  }

  //public interface
  isTree() {
    if (!this._root) return false;
    let nodeCount = 0;
    /*
    requirements:npm run 
    more than 1 node.
    nodes are an instance of Node class
    */
    let currentNode = this._root;
    const checkoutNode = (currentNode) => {
      if (currentNode instanceof this._Node) {
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

      let midIndex = Math.ceil((arr.length - 1) / 2);
      let left = arr.slice(0, midIndex) ? arr.slice(0, midIndex) : null;
      let right = arr.slice(midIndex + 1) ? arr.slice(midIndex + 1) : null;
      4;
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
    this._root = rootNode;
    return rootNode;
  }

  clear() {
    let nodeArr = this._getDepthFirstTraversalArray();
    nodeArr.forEach((node) => {
      delete node.left;
      delete node.right;
    });
    this._root = null;
  }

  getTreeOverview() {
    let arr = [];

    function checkNode(node, layer) {
      if (!Array.isArray(arr[layer])) {
        arr[layer] = [];
      }

      arr[layer].push(node.data);

      const newLayer = layer + 1;

      if (node.left) {
        checkNode(node.left, newLayer);
      } else {
        if (!Array.isArray(arr[newLayer])) {
          arr[newLayer] = [];
        }

        arr[newLayer].push(' ');
      }

      if (node.right) {
        checkNode(node.right, newLayer);
      } else {
        if (!Array.isArray(arr[newLayer])) {
          arr[newLayer] = [];
        }

        arr[newLayer].push(' ');
      }
    }

    checkNode(this._root, 0);

    let treeDisplay = '';
    arr.forEach((layer) => {
      let line = layer.join('-');
      treeDisplay += line;
      treeDisplay += `\n`;
    });

    console.log(treeDisplay);
  }

  find(value) {
    let returnValue = undefined;
    function findNode(node) {
      if (node.data == value) {
        returnValue = node;
      }

      if (value < node.data) {
        if (!node.left) {
          return;
        } else {
          return findNode(node.left);
        }
      } else {
        if (!node.right) {
          return;
        } else {
          return findNode(node.right);
        }
      }
    }

    findNode(this._root);

    if (typeof returnValue == 'undefined') {
      console.log(`no node with value: "${value}" found`);
    }

    return returnValue;
  }

  insert(value) {
    const Node = this._Node;
    let returnValue = false;
    function findNode(node) {
      if (value <= node.data) {
        if (!node.left) {
          node.left = new Node({ data: value });
          returnValue = true;
        } else {
          return findNode(node.left);
        }
      } else {
        if (!node.right) {
          node.right = new Node({ data: value });
          returnValue = true;
        } else {
          return findNode(node.right);
        }
      }
    }

    findNode(this._root);
    return returnValue;
  }

  deleteNode(value) {
    const Tree = this;

    const nodeData = this._advancedFind(value);
    if (!nodeData) {
      return undefined;
    }

    this.#i = this.#i + 1;
    if (this.#i > 4) {
      return;
    }

    const node = nodeData.node;
    const parent = nodeData.parent;

    switch (true) {
      case !node.right && !node.left:
        deleteLeafNode(node);
        break;
      case Boolean(node.right) && Boolean(node.left):
        deleteTwoChildrenNode(node);
        break;
      case Boolean(node.left):
        deleteSingleChildNode(node);
        break;
      case Boolean(node.right):
        deleteSingleChildNode(node);
        break;
    }

    function deleteLeafNode(node) {
      console.log('deleteLeafNode');
      nodeData.parent = null;
      delete node.data;
    }

    function deleteTwoChildrenNode(node) {
      console.log('deleteTwoChildrenNode');
      console.log(node.data);

      const lowestNode = Tree._findLowestNodeFrom(node);
      console.log(lowestNode.data);

      newNode = structuredClone(lowestNode);
      Tree.deleteNode(lowestNode.data);

      newNode.left = node.left;
      newNode.right = node.right;

      if (Tree._root == node) {
        Tree._root = newNode;
      } else {
        if (parent.left == node) {
          parent.left = newNode;
        } else {
          parent.right = newNode;
        }
      }
    }

    function deleteSingleChildNode(node) {
      console.log('deleteSingleChildNode');

      if (node.left) {
        newNode = node.left;
      } else {
        newNode = node.right;
      }

      if (Tree._root == node) {
        Tree._root = newNode;
      } else {
        if (parent.left == node) {
          parent.left = newNode;
        } else {
          parent.right = newNode;
        }
      }
    }
  }

  //private interface
  _root = null;

  _sortArray(arr) {
    return mergeSort(arr);
  }

  _getDepthFirstTraversalArray() {
    let arr = [];
    function checkNode(node) {
      arr.push(node);

      if (node.left) {
        checkNode(node.left);
      }

      if (node.right) {
        checkNode(node.right);
      }
    }
    checkNode(this._root);

    return arr;
  }

  _advancedFind(value) {
    let node = undefined;
    let parentNode = undefined;

    function findNode(node) {
      if (node.data == value) {
        return node;
      }

      if (value < node.data) {
        if (!node.left) {
          return;
        } else {
          parentNode = node;
          return findNode(node.left);
        }
      } else {
        if (!node.right) {
          return;
        } else {
          parentNode = node;
          return findNode(node.right);
        }
      }
    }

    node = findNode(this._root);

    if (typeof node == 'undefined') {
      return undefined;
    }

    return { node, parent: parentNode };
  }

  _findLowestNodeFrom(node) {
    if ((!node) instanceof this._Node) {
      console.error('input needs to be a node');
      return;
    }

    function goLower(node) {
      if (node.left) {
        return goLower(node.left);
      } else {
        return node;
      }
    }

    const lowestNode = goLower(node);
    return lowestNode;
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
