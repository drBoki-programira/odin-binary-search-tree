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
})