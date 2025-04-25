import { makeLinkedList } from "./linkedList.js";

const list = makeLinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log("Length", list.insertAt("fox", 5));
// console.log("Length", list.removeAt(3));
console.log(
  "Main",
  list.toString(),
  "tail",
  list.getTail(),
  "head",
  list.getHead()
);
