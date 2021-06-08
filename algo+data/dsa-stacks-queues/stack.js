/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    const newNode = new Node(val);
    if (!this.size) [this.first, this.last] = [newNode, newNode];

    if (this.size) {
      const curr = this.first;
      this.first = newNode;
      this.first.next = curr;
    }
    this.size += 1;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    const removedNode = this.first.val;
    if (!this.size) throw new Error("Stack is empty");
    if (this.size === 1) [this.first, this.last] = [null, null];
    if (this.size > 1) {
      const newFirst = this.first;
      this.first.next = null;
      this.first = newFirst;
    }
    this.size -= 1;
    return removedNode;
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return !this.size ? true : false;
  }
}

module.exports = Stack;
