import { Tree } from "../src/bst";

describe("Binary Search Tree tests:", () => {
  let bst
  let smallBst

  beforeEach(() => {
    smallBst = new Tree([1, 2, 3, 4])
    bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
  })

  test("init: should build a balanced tree (small sorted array)", () => {
    expect(smallBst.root.data).toBe(2)
    expect(smallBst.root.left.data).toBe(1)
    expect(smallBst.root.left.left).toBe(null)
    expect(smallBst.root.right.data).toBe(3)
    expect(smallBst.root.right.right.data).toBe(4)
  })

  test("init: should remove duplicate elements, sort array and build a balanced tree", () => {
    expect(bst.root.data).toBe(8)
    expect(bst.root.left.left.data).toBe(1)
    expect(bst.root.left.right.right.data).toBe(7)
    expect(bst.root.right.left.right.data).toBe(23)
    expect(bst.root.right.right.right.data).toBe(6345)
  })

  test("includes: should return false if the given value is not in the tree", () => {
    expect(bst.includes(16)).toBe(false)
    expect(bst.includes(42)).toBe(false)
  })

  test("includes: should return true if the given value is in the tree", () => {
    expect(bst.includes(6345)).toBe(true)
    expect(bst.includes(23)).toBe(true)
  })

  test("insert: should place a new node in the tree, in the appropriate place", () => {
    bst.insert(42)
    bst.insert(2)
    bst.insert(72)
    expect(bst.root.right.left.right.right.data).toBe(42)
    expect(bst.root.left.left.right.left.data).toBe(2)
    expect(bst.root.right.right.left.data).toBe(72)
  })

  test("deleteItem: should do nothing if value is not in the tree", () => {
    const treeBefore = JSON.stringify(smallBst)
    smallBst.deleteItem(6345)
    const treeAfter = JSON.stringify(smallBst)
    expect(treeBefore).toEqual(treeAfter)
  })

  test("deleteItem: should remove node from the tree (leaf node)", () => {
    bst.deleteItem(6345)
    expect(bst.root.right.right.right).toBe(null)
  })

  test("deleteItem: should remove node from the tree and keep the bst structure (one child)", () => {
    bst.deleteItem(324)
    expect(bst.root.right.right.data).toBe(6345)
    expect(bst.root.right.right.right).toBe(null)
  })

  test("deleteItem: should remove node from the tree and keep the bst structure (both children)", () => {
    bst.deleteItem(67)
    expect(bst.root.right.data).toBe(324)
    expect(bst.root.right.right.data).toBe(6345)
    expect(bst.root.right.left.data).toBe(9)
    bst.deleteItem(8)
    expect(bst.root.data).toBe(9)
  })

  test("levelOrderForEach: should throw an error if no callback is passed", () => {
    expect(() => bst.levelOrderForEach()).toThrow(TypeError)
  })

  test("levelOrderForEach: should call the provided callback on each node, breadth first traversal", () => {
    let list = []
    bst.levelOrderForEach((value) => list.push(value))
    expect(list).toEqual([8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345])
  })

  test("inOrderForEach: should throw an error if no callback is passed", () => {
    expect(() => bst.inOrderForEach()).toThrow(TypeError)
  })

  test("inOrderForEach: should call the provided callback on each node, inorder depth first", () => {
    let list = []
    bst.inOrderForEach((value) => list.push(value))
    expect(list).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345])
  })

  test("preOrderForEach: should throw an error if no callback is passed", () => {
    expect(() => bst.preOrderForEach()).toThrow(TypeError)
  })

  test("preOrderForEach: should call the provided callback on each node, preorder depth first", () => {
    let list = []
    bst.preOrderForEach((value) => list.push(value))
    expect(list).toEqual([8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345])
  })

  test("postOrderForEach: should throw an error if no callback is passed", () => {
    expect(() => bst.postOrderForEach()).toThrow(TypeError)
  })

  test("postOrderForEach: should call the provided callback on each node, postorder depth first", () => {
    let list = []
    bst.postOrderForEach((value) => list.push(value))
    expect(list).toEqual([3, 1, 7, 5, 4, 23, 9, 6345, 324, 67, 8])
  })
})