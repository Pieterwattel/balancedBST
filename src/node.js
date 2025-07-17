class Node {
  constructor(dataObj) {
    this.data = dataObj.data || null;
    this.left = dataObj.left || null;
    this.right = dataObj.right || null;
  }
}

export { Node };
