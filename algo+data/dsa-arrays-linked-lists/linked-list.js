/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get(i): retrieve node at i */
  _get(i) {
    if (i >= this.length || i < 0) {
      throw new Error("Invalid index.");
    }

    let curr = this.head;
    let count = 0;

    while (curr !== null && count != i) {
      count += 1;
      curr = curr.next;
    }

    return curr;
  }

  /** _set(i): set node at i */
  _set(i, val) {
    if (i >= this.length || i < 0) {
      throw new Error("Invalid index.");
    }

    let curr = this.head;

    if (i === 0) {
      this.unshift(val);
    } else if (i === this.length) {
      this.push(val);
    } else {
      for (let count = 0; count <= i; count++) {
        if (count != i) {
          curr = curr.next;
        } else {
          curr.val = val;
        }
      }
    }
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.length) {
      [this.head, this.tail] = [newNode, newNode];
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if (!this.length) {
      [this.head, this.tail] = [newNode, newNode];
    } else {
      const currNode = this.head;
      [this.head, this.head.next] = [newNode, currNode];
    }
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 1) {
      const currNode = this.head.val;
      [this.head, this.tail, this.length] = [null, null, 0];
      return currNode;
    }
    const currNode = this.head;
    while (currNode.next) {
      if (currNode.next.next === null) {
        const popped = currNode.next.val;
        currNode.next = null;
        this.tail = currNode;
        this.length -= 1;
        return popped;
      }
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 1) {
      const currNode = this.head.val;
      [this.head, this.tail, this.length] = [null, null, 0];
      return currNode;
    }

    const newHead = this.head.next;
    const oldHead = this.head.val;
    this.head.next = null;
    this.head = newHead;
    this.length -= 1;
    return oldHead;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    return this._set(idx, val);
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(i, val) {
    if (i > this.length || i < 0) {
      throw new Error("Invalid index.");
    }

    if (i === 0) return this.unshift(val);
    if (i === this.length) return this.push(val);

    const node = this._get(i - 1);
    const newNode = new Node(val);
    newNode.next = node.next;
    node.next = newNode;
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(i) {
    if (i > this.length || i < 0) {
      throw new Error("Invalid index.");
    }

    if (i === 0) return this.shift();
    if (i === this.length) return this.pop();

    const node = this.get(i - 1);
    node.next = node.next.next;
    this.length -= 1;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let count = 0;
    let curr = this.head;

    for (let i = 0; i < this.length; i++) {
      count += curr.val;
      curr = curr.next;
    }
    return count / this.length;
  }
}

module.exports = LinkedList;
