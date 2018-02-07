function DepthFirstSearch(problem) {
  const fringe = [];
  const closed = {};
  let result = null;

  // Create start node with empty path
  const startnode = {state: problem.getStartState()};
  let node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) {
    problem.forEachSuccessor(node.state, function (successor) {
      // Test for goal state (before-push)
      if (problem.isGoalState(successor)) {
        // Goal found
        result = successor;
        return;
      }

      // Avoid already pushed states (graph search)
      const successor_hash = problem.computeHash(successor);
      if (libUtility.isUndefined(closed[successor_hash])) {
        fringe.push({state: successor});
        closed[successor_hash] = successor;
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

function BreadthFirstSearch(problem) {
  let fringe = [];
  const closed = {};

  const startnode = {state: problem.getStartState()};
  let node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) {
    problem.forEachSuccessor(node.state, function (successor) {
      const successor_hash = problem.computeHash(successor);
      if (libUtility.isUndefined(closed[successor_hash])) {
        fringe.push({state: successor});
        closed[successor_hash] = successor;
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

function UniformCostSearch(problem) {
  let fringe = new libUtility.PriorityQueue('cost');
  const closed = {};

  const startnode = {state: problem.getStartState(), cost: 0.0};
  let node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = {state: node.state, prevCost: node.cost};

  while (true) {
    problem.forEachSuccessor(node.state, function (successor, successor_cost) {
      const successor_hash = problem.computeHash(successor);
      let _successor;
      if (libUtility.isUndefined(_successor = closed[successor_hash]) || node.cost + successor_cost < _successor.prevCost) {
        fringe.push({state: successor, cost: node.cost + successor_cost});
        closed[successor_hash] = {state: successor, prevCost: node.cost + successor_cost};
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
function SimpleUniformCostSearch(problem) {
  let fringe = new libUtility.PriorityQueue('cost');
  const closed = {};

  const startnode = {state: problem.getStartState(), cost: 0.0};
  let node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) {
    problem.forEachSuccessor(node.state, function (successor, successor_cost) {
      const successor_hash = problem.computeHash(successor);
      if (libUtility.isUndefined(closed[successor_hash])) {
        fringe.push({state: successor, cost: successor_cost});
        closed[successor_hash] = successor;
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

function SimpleAStarSearch(problem, heuristic) {
  let fringe = new libUtility.PriorityQueue('cost');
  const closed = {};

  const CHECK_CONSISTENCY = false;

  const startnode = {state: problem.getStartState(), f: 0.0, g: 0.0};
  let node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) {
    problem.forEachSuccessor(node.state, function (successor, successor_cost) {
      const h = problem.heuristic(successor);
      const g = successor_cost;
      if (CHECK_CONSISTENCY && g + h < node.f) {
        throw new Error('Inconsistency found in A*-search heuristic');
      }
      const successor_hash = problem.computeHash(successor);
      if (libUtility.isUndefined(closed[successor_hash])) {
        fringe.push({state: successor, f: g + h, g: g});
        closed[successor_hash] = successor;
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

function SimpleGreedySearch(problem) {
  const startstate = problem.getStartState();
  let state = startstate;
  if (problem.isGoalState(state)) {
    return state;
  } // Start state is goal

  let cheapestCost = Number.MAX_VALUE;
  let cheapestSuccessor;
  while (true) {
    cheapestSuccessor = null;
    problem.forEachSuccessor(state, function (successor, successor_cost) {
      if (successor_cost < cheapestCost) {
        cheapestCost = successor_cost;
        cheapestSuccessor = successor;
      }
    });
    if ((state = cheapestSuccessor) === null) {
      return null;
    } // Goal not found
    if (problem.isGoalState(state)) {
      return state;
    } // Goal found
  }
}
