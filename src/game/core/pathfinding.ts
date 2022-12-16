// A star algorithm
interface Node {
  id: string;
  x: number;
  y: number;
  f: number; // total cost function
  g: number; // cost function from start to the current node point
  h: number; // heuristic estimated cost function from current node point to the goal
  connectedTo: string[];
  parent?: Node;
}

// Manhattan distance
const heuristic = (a: Node, b: Node) => {
  return 0;
  const d1 = Math.abs(a.x - b.x);
  const d2 = Math.abs(a.y - b.y);

  return d1 * d1 + d2 * d2;
};

/**
 * TODO: Refactor following guide (using PriorityQueue)
 * https://www.redblobgames.com/pathfinding/a-star/introduction.html
 * https://www.redblobgames.com/pathfinding/a-star/implementation.html
 * http://theory.stanford.edu/~amitp/GameProgramming/
 */

export class Pathfinder {
  private openList: Node[] = [];
  private closedList: Node[] = [];
  private nodes;

  constructor(nodes: Node[]) {
    this.nodes = nodes;
  }

  private reset() {
    this.openList = [];
    this.closedList = [];
  }

  findPath(start: Node, end: Node) {
    const path = [];

    this.reset();
    this.openList.push(start);

    while (this.openList.length) {
      let lowestIndex = 0;

      for (let i = 0; i < this.openList.length; i++) {
        // we compare the total cost function to get the next node to evaluate
        if (this.openList[i].f < this.openList[lowestIndex].f) {
          lowestIndex = i;
        }
      }

      let current = this.openList[lowestIndex];

      if (current.id === end.id) {
        let temp = current;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        console.log('DONE!');
        // return the traced path
        return path.reverse();
      }

      //remove current from openSet
      this.openList.splice(lowestIndex, 1);
      //add current to closedSet
      this.closedList.push(current);

      const neighbors = this.nodes.filter((node) =>
        current.connectedTo.includes(node.id)
      );

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!this.closedList.includes(neighbor)) {
          let possibleG = current.g + 1;

          if (!this.openList.includes(neighbor)) {
            this.openList.push(neighbor);
          } else if (possibleG >= neighbor.g) {
            continue;
          }

          neighbor.g = possibleG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }

    return [];
  }
}
