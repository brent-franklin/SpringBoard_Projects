/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    let sum = this.root.val;

    function sumNode(tree) {
      for (let node of tree) {
        if (node.children.length > 0) {
          sumNode(node.children);
        }
        sum += node.val;
      }
    }

    sumNode(this.root.children);
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    function countEvenVals(tree) {
      for (let node of tree) {
        if (node.val % 2 === 0) count++;
        if (node.children.length > 0) countEvenVals(node.children);
      }
    }

    let count = this.root.val % 2 === 0 ? 1 : 0;
    countEvenVals(this.root.children);
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;

    function countHigherVals(tree) {
      for (let node of tree) {
        if (node.val > lowerBound) count++;
        if (node.children.length > 0) countHigherVals(node.children);
      }
    }

    let count = this.root.val > lowerBound ? 1 : 0;
    countHigherVals(this.root.children);
    return count;
  }
}

module.exports = { Tree, TreeNode };
