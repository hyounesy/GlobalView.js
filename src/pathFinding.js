import { isUndefined, PriorityQueue } from './utility';

/**
 * Runs depth first search on the given problem
 * @param {Problem} problem {forEachSuccessor(), getStartState(), computeHash(), isGoalState()}
 */
export function DepthFirstSearch(problem) {
  const fringe = [];
  const closed = {};
  let result = null;

  // Create start node with empty path
  const startnode = { state: problem.getStartState() };
  let node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) { // eslint-disable-line no-constant-condition
    problem.forEachSuccessor(node.state, (successor) => { // eslint-disable-line no-loop-func
      // Test for goal state (before-push)
      if (problem.isGoalState(successor)) {
        // Goal found
        result = successor;
        return;
      }

      // Avoid already pushed states (graph search)
      const successorHash = problem.computeHash(successor);
      if (isUndefined(closed[successorHash])) {
        fringe.push({ state: successor });
        closed[successorHash] = successor;
      }
    });
    if (result !== null) {
      return result;
    }

    // Test if maze has been completly traversed without finding any goal state
    if (fringe.length === 0) {
      return null;
    } // Goal not found

    // Pop new node and update dirs to be the path of the freshly pop'ed node
    node = fringe.pop();
  }
}

/**
 * Runs breath first search on the given problem
 * @param {Problem} problem {forEachSuccessor(), getStartState(), computeHash(), isGoalState()}
 */
export function BreadthFirstSearch(problem) {
  let fringe = [];
  const closed = {};

  const startnode = { state: problem.getStartState() };
  let node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) { // eslint-disable-line no-constant-condition
    // eslint-disable-next-line no-loop-func
    problem.forEachSuccessor(node.state, (successor) => {
      const successorHash = problem.computeHash(successor);
      if (isUndefined(closed[successorHash])) {
        fringe.push({ state: successor });
        closed[successorHash] = successor;
      }
    });

    if (fringe.length === 0) {
      return null;
    } // Goal not found
    node = fringe.shift();
    if (problem.isGoalState(node.state)) {
      fringe = null;
      return node.state; // Goal found
    }
  }
}

/**
 * Runs uniform cost search algorithm on the given problem
 * @param {Problem} problem {forEachSuccessor(), getStartState(), computeHash(), isGoalState()}
 */
export function UniformCostSearch(problem) {
  let fringe = new PriorityQueue('cost');
  const closed = {};

  const startnode = { state: problem.getStartState(), cost: 0.0 };
  let node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = { state: node.state, prevCost: node.cost };

  while (true) { // eslint-disable-line no-constant-condition
    // eslint-disable-next-line no-loop-func
    problem.forEachSuccessor(node.state, (successor, successorCost) => {
      const successorHash = problem.computeHash(successor);
      const varSuccessor = closed[successorHash];
      if (isUndefined(varSuccessor) ||
        node.cost + successorCost < varSuccessor.prevCost) {
        fringe.push({ state: successor, cost: node.cost + successorCost });
        closed[successorHash] = { state: successor, prevCost: node.cost + successorCost };
      }
    });

    if (fringe.length === 0) {
      return null;
    } // Goal not found
    node = fringe.pop();
    if (problem.isGoalState(node.state)) {
      fringe = null;
      return node.state; // Goal found
    }
  }
}

/**
 * Runs simple uniform cost search on the given problem
 * @param {Problem} problem {getStartState(), isGoalState(), forEachSuccessor(), computeHash()}
 */
export function SimpleUniformCostSearch(problem) {
  let fringe = new PriorityQueue('cost');
  const closed = {};

  const startnode = { state: problem.getStartState(), cost: 0.0 };
  let node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) { // eslint-disable-line no-constant-condition
    // eslint-disable-next-line no-loop-func
    problem.forEachSuccessor(node.state, (successor, successorCost) => {
      const successorHash = problem.computeHash(successor);
      if (isUndefined(closed[successorHash])) {
        fringe.push({ state: successor, cost: successorCost });
        closed[successorHash] = successor;
      }
    });

    if (fringe.length === 0) {
      return null;
    } // Goal not found
    node = fringe.pop();
    if (problem.isGoalState(node.state)) {
      fringe = null;
      return node.state; // Goal found
    }
  }
}

/**
 * Runs simple A* search on the given problem
 * @param {Problem} problem {getStartState(), isGoalState(),
 * forEachSuccessor(), computeHash(), heuristic()}
 */
export function SimpleAStarSearch(problem) {
  let fringe = new PriorityQueue('cost');
  const closed = {};

  const CHECK_CONSISTENCY = false;

  const startnode = { state: problem.getStartState(), f: 0.0, g: 0.0 };
  let node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) { // eslint-disable-line no-constant-condition
    // eslint-disable-next-line no-loop-func
    problem.forEachSuccessor(node.state, (successor, successorCost) => {
      const h = problem.heuristic(successor);
      const g = successorCost;
      if (CHECK_CONSISTENCY && g + h < node.f) {
        throw new Error('Inconsistency found in A*-search heuristic');
      }
      const successorHash = problem.computeHash(successor);
      if (isUndefined(closed[successorHash])) {
        fringe.push({ state: successor, f: g + h, g });
        closed[successorHash] = successor;
      }
    });

    if (fringe.length === 0) {
      return null;
    } // Goal not found
    node = fringe.pop();
    if (problem.isGoalState(node.state)) {
      fringe = null;
      return node.state; // Goal found
    }
  }
}

/**
 * Runs simple greedy search on the given problem
 * @param {Problem} problem {getStartState(), isGoalState(), forEachSuccessor()}
 */
export function SimpleGreedySearch(problem) {
  const startstate = problem.getStartState();
  let state = startstate;
  if (problem.isGoalState(state)) {
    return state;
  } // Start state is goal

  let cheapestCost = Number.MAX_VALUE;
  let cheapestSuccessor;
  while (true) { // eslint-disable-line no-constant-condition
    cheapestSuccessor = null;
    // eslint-disable-next-line no-loop-func
    problem.forEachSuccessor(state, (successor, successorCost) => {
      if (successorCost < cheapestCost) {
        cheapestCost = successorCost;
        cheapestSuccessor = successor;
      }
    });
    state = cheapestSuccessor;
    if (state === null) {
      return null;
    } // Goal not found
    if (problem.isGoalState(state)) {
      return state;
    } // Goal found
  }
}
