import { Tree } from "./bst.js";

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

bst.insert(2)
bst.insert(42)
bst.insert(6)
bst.insert(12)
bst.insert(72)
bst.prettyPrint(bst.root)
