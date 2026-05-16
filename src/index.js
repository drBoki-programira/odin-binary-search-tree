import { Tree } from "./bst.js";

const rngArray = function (range) {
  const arr = [];
  for (let i = 0; i < range; i++) {
    let number = Math.floor(Math.random() * 100);
    arr.push(number);
  }
  return arr;
};

const balanceLog = function (isBalanced) {
  const msg = isBalanced ? "As all things should be." : "Tree is out of wack.";
  console.log(msg);
};

const getElements = function () {
  const levelOrder = [];
  const inOrder = [];
  const preOrder = [];
  const postOrder = [];
  bst.levelOrderForEach((value) => levelOrder.push(value));
  bst.inOrderForEach((value) => inOrder.push(value));
  bst.preOrderForEach((value) => preOrder.push(value));
  bst.postOrderForEach((value) => postOrder.push(value));

  return { levelOrder, inOrder, preOrder, postOrder };
};

const logElements = function (elements) {
  Object.keys(elements).forEach((order) => {
    console.log(`${order}: `, elements[order]);
  });
};

const nToBuild = 50;
const nToAdd = 10;

const arr = rngArray(nToBuild);
const bst = new Tree(arr);
console.log(`Binary search tree of ${nToBuild} random numbers from 0 to 100.`);
balanceLog(bst.isBalanced());
logElements(getElements());
console.log();

const newArr = rngArray(nToAdd);
newArr.forEach((n) => bst.insert(n + 100));
console.log(`Adding ${nToAdd} numbers larger than 100 to the tree.`);
balanceLog(bst.isBalanced());
console.log();

bst.rebalance();
console.log("Tree is in balance again.");
balanceLog(bst.isBalanced());
logElements(getElements());
