import { Tree } from "./bst.js";

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

bst.prettyPrint(bst.root)
bst.preOrderForEach(console.log)
