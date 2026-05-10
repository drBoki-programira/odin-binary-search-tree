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
})