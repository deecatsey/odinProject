const makeNode = (value = null) => ({
  value,
  nextNode: null,
});

const makeLinkedList = () => {
  let head = null;
  let tail = null;

  // adds a new node containing value to the end of the list
  const append = (value) => {
    const node = makeNode(value);
    if (!head) {
      head = node;
      return;
    }
    if (!tail) {
      tail = node;
      head.nextNode = node;
      return;
    }
    const prevTail = tail;
    prevTail.nextNode = node;
    tail = node;
  };
  // adds a new node containing value to the start of the list
  const prepend = (value) => {
    const node = makeNode(value);
    if (!head) {
      head = node;
      return;
    }
    const prevHead = head;
    node.nextNode = prevHead;
    head = node;
  };

  // returns the total number of nodes in the list
  const getSize = () => {
    let node = head;
    let count = 0;
    while (node !== null) {
      const { nextNode } = node;
      console.log(node, "next", nextNode);
      node = nextNode;
      count++;
    }
    return count;
  };
  // returns the first node in the list
  const getHead = () => head;
  //returns the last node in the list
  const getTail = () => tail;
  // returns the node at the given index
  const getNodeAt = (index) => {
    let count = 0;
    let node = head;
    while (count < index) {
      const nextNode = node.nextNode;
      node = nextNode;
      count++;
    }
    return node;
  };
  // removes the last element from the list
  const pop = () => {
    if (!head) return;
    let node = head;
    let prevNode = null;
    while (node.nextNode !== null) {
      {
        const { nextNode } = node;
        console.log(node, "next", nextNode);
        if (!nextNode) return;
        prevNode = node;
        node = nextNode;
      }
    }
    prevNode.nextNode = null;
    tail = prevNode;
  };
  // returns true if the passed in value is in the list and otherwise returns false.
  const contains = (value) => {
    let node = head;
    while (node !== null) {
      if (node.value === value) return true;
      const { nextNode } = node;
      node = nextNode;
    }
    return false;
  };
  // returns the index of the node containing value, or null if not found.
  const find = (value) => {
    let node = head;
    let index = -1;
    while (node !== null) {
      index++;
      if (node.value === value) return index;
      const nextNode = node.nextNode;
      node = nextNode;
    }
    return null;
  };
  // represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
  const toString = () => {
    let node = head;
    let values = `( ${head.value} )`;
    while (node !== null) {
      const { nextNode } = node;
      node = nextNode;
      const { value } = node || { value: null };
      values = values.concat(` -> ( ${value} )`);
    }
    return values;
  };
  // that inserts a new node with the provided value at the given index.
  const insertAt = (value, index) => {
    if (index < 0) return;
    const nodeAtIndex = getNodeAt(index);
    console.log("node at index", nodeAtIndex);

    const newNode = makeNode(value);
    newNode.nextNode = nodeAtIndex;

    if (index === 0) {
      head = newNode;
      return;
    }
    const nodeBefore = getNodeAt(index - 1);
    nodeBefore.nextNode = newNode;
  };
  // that removes the node at the given index.
  const removeAt = (index) => {
    if (index < 0) return;
    const nodeAtIndex = getNodeAt(index);
    const { nextNode } = nodeAtIndex;

    if (index === 0) {
      head = nextNode;
      return;
    }
    const nodeBefore = getNodeAt(index - 1);
    nodeBefore.nextNode = nextNode;
    if (nextNode !== null) return;
    tail = nodeBefore;
  };

  return {
    append,
    prepend,
    getSize,
    getHead,
    getTail,
    getNodeAt,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};

export { makeLinkedList };
