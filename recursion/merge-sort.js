/* Build a function mergeSort that takes in an array and returns a sorted array, 
using a recursive merge sort methodology. An input of [3, 2, 1, 13, 8, 5, 0, 1] 
should return [0, 1, 1, 2, 3, 5, 8, 13], and an input of [105, 79, 100, 110] 
should return [79, 100, 105, 110].
 */

let meh = 0;

const mergeSort = (list) => {
  const listPart = [...list];

  if (list.length === 1) {
    return list;
  }

  const listPart2 = listPart.splice(Math.floor(listPart.length / 2));

  const list1 = mergeSort(listPart);
  const list2 = mergeSort(listPart2);

  let iterator1 = 0;
  let iterator2 = 0;

  const sortedList = [];

  while (iterator1 < list1.length && iterator2 < list2.length) {
    if (list1[iterator1] < list2[iterator2]) {
      sortedList.push(list1[iterator1]);
      iterator1++;
    } else {
      sortedList.push(list2[iterator2]);
      iterator2++;
    }
  }

  for (let index = iterator1; index < list1.length; index++) {
    sortedList.push(list1[index]);
  }
  for (let index = iterator2; index < list2.length; index++) {
    sortedList.push(list2[index]);
  }

  return sortedList;
};

const testValue1 = [3, 2, 1, 13, 8, 5, 0, 1]; // =>  [0, 1, 1, 2, 3, 5, 8, 13]
const testValue2 = [105, 79, 100, 110]; // => [79, 100, 105, 110]

const test1 = mergeSort(testValue1);
const test2 = mergeSort(testValue2);

console.log("Test1:", test1);
console.log("Test2:", test2);
