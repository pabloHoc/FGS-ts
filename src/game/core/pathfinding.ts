import { Region } from '../entities/region';

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

export const regionToNode = (region: Region) => {
  return { ...region, f: 0, g: 0, h: 0 };
};

export const regionsToNodes = (region: Region[]) => {
  return region.map((region) => ({ ...region, f: 0, g: 0, h: 0 }));
};

export const findPath = (start: Node, end: Node, nodes: Node[]) => {
  const openList: Node[] = [];
  const closedList: Node[] = [];

  const path = [];

  openList.push(start);

  while (openList.length) {
    let lowestIndex = 0;

    for (let i = 0; i < openList.length; i++) {
      // we compare the total cost function to get the next node to evaluate
      if (openList[i].f < openList[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    let current = openList[lowestIndex];

    if (current.id === end.id) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      // return the traced path
      return path.reverse();
    }

    //remove current from openSet
    openList.splice(lowestIndex, 1);
    //add current to closedSet
    closedList.push(current);

    const neighbors = nodes.filter((node) =>
      current.connectedTo.includes(node.id)
    );

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedList.includes(neighbor)) {
        let possibleG = current.g + 1;

        if (!openList.includes(neighbor)) {
          openList.push(neighbor);
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
};
