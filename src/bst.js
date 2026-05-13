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

  includes(value, node = this.root) {

    if (!node) return false
    else if (value === node.data) return true
    else if (value < node.data) return false || this.includes(value, node.left)
    else return false || this.includes(value, node.right)

  }

  insert(value, node = this.root) {

    if (!node || value === node.data) return
    else if (!node.left && value < node.data) node.left = new Node(value)
    else if (!node.right && value > node.data) node.right = new Node(value)
    else if (value < node.data) this.insert(value, node.left)
    else this.insert(value, node.right)

  }

  deleteItem(value, node = this.root) {

    if (!node) return node
    else if (value > node.data) node.right = this.deleteItem(value, node.right)
    else if (value < node.data) node.left = this.deleteItem(value, node.left)
    else if (value === node.data) {
      
      if (!node.left) node = node.right
      else if (!node.right) node = node.left
      else {
        let successorNode = node.right

        while (successorNode && successorNode.left) {
          successorNode = successorNode.left
        }

        node.data = successorNode.data
        node.right = this.deleteItem(successorNode.data, node.right)
      }
  
    }

    return node
  } 
}

export { Tree }