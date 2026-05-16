class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const set = new Set(array);
    const sortedArr = [...set].sort((a, b) => a - b);

    this.root = this.buildTree(sortedArr, 0, sortedArr.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    const leftArray = array.slice(start, mid);
    const rightArray = array.slice(mid + 1);

    node.left = this.buildTree(leftArray, 0, leftArray.length - 1);
    node.right = this.buildTree(rightArray, 0, rightArray.length - 1);

    return node;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  includes(value, node = this.root) {
    if (!node) return false;
    else if (value === node.data) return true;
    else if (value < node.data) return false || this.includes(value, node.left);
    else return false || this.includes(value, node.right);
  }

  insert(value, node = this.root) {
    if (!node || value === node.data) return;
    else if (!node.left && value < node.data) node.left = new Node(value);
    else if (!node.right && value > node.data) node.right = new Node(value);
    else if (value < node.data) this.insert(value, node.left);
    else this.insert(value, node.right);
  }

  deleteItem(value, node = this.root) {
    if (!node) return node;
    else if (value > node.data) node.right = this.deleteItem(value, node.right);
    else if (value < node.data) node.left = this.deleteItem(value, node.left);
    else if (value === node.data) {
      if (!node.left) node = node.right;
      else if (!node.right) node = node.left;
      else {
        let successorNode = node.right;

        while (successorNode && successorNode.left) {
          successorNode = successorNode.left;
        }

        node.data = successorNode.data;
        node.right = this.deleteItem(successorNode.data, node.right);
      }
    }

    return node;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new TypeError("Argument must be a callback.");
    let queue = [this.root];

    while (queue.length !== 0) {
      let node = queue.shift();

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      callback(node.data);
    }
  }
  // recursive
  // levelOrderForEach(callback, queue = [this.root]) {
  //   if (typeof callback !== "function") throw new TypeError("Argument must be a callback.")
  //   if (queue.length === 0) return

  //   let node = queue.shift()
  //   if (node.left) queue.push(node.left)
  //   if (node.right) queue.push(node.right)

  //   callback(node.data)

  //   this.levelOrderForEach(callback, queue)
  //   this.levelOrderForEach(callback, queue)
  // }

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function")
      throw new TypeError("Argument must be a callback.");
    if (!node) return;

    this.inOrderForEach(callback, node.left);
    callback(node.data);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function")
      throw new TypeError("Argument must be a callback.");
    if (!node) return;

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function")
      throw new TypeError("Argument must be a callback.");
    if (!node) return;

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node.data);
  }

  _calculateHeight(node) {
    if (!node) return -1;
    else
      return (
        1 +
        Math.max(
          this._calculateHeight(node.left),
          this._calculateHeight(node.right)
        )
      );
  }

  height(value) {
    let node = this.root;

    while (value !== node.data) {
      if (value > node.data) node = node.right;
      else node = node.left;

      if (node === null) break;
    }

    if (node) return this._calculateHeight(node);
  }

  depth(value) {
    let node = this.root;
    let sum = 0;

    while (value !== node.data) {
      if (value > node.data) node = node.right;
      else node = node.left;
      sum++;

      if (node === null) break;
    }

    if (node) return sum;
  }

  isBalanced(node = this.root) {
    if (!node || !node.left || !node.right) return true;

    let leftHeight = this.height(node.left.data);
    let rightHeight = this.height(node.right.data);
    let balanceCheck = Math.abs(leftHeight - rightHeight) <= 1;
    let balanceCheckLeft = this.isBalanced(node.left);
    let balanceCheckRight = this.isBalanced(node.right);

    return balanceCheck && balanceCheckLeft && balanceCheckRight;
  }

  rebalance() {
    let nodeValues = [];
    this.inOrderForEach((value) => nodeValues.push(value));
    this.root = this.buildTree(nodeValues, 0, nodeValues.length - 1);
  }
}

export { Tree };
