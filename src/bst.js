class Node {

  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }

}

class Tree {

  constructor(array) {
    const set = new Set(array)
    const sortedArr = [...set].sort((a, b) => a - b)

    this.root = this.buildTree(sortedArr, 0, sortedArr.length - 1)
  }

  buildTree(array, start, end) {
    if (start > end) return null

    const mid = Math.floor((start + end) / 2)
    const node = new Node(array[mid])

    const leftArray = array.slice(start, mid)
    const rightArray = array.slice(mid + 1)
    
    node.left = this.buildTree(leftArray, 0, leftArray.length - 1)
    node.right = this.buildTree(rightArray, 0, rightArray.length - 1)

    return node
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }
  
    this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }

}

export { Tree }