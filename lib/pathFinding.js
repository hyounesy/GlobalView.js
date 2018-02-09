'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DepthFirstSearch = DepthFirstSearch;
exports.BreadthFirstSearch = BreadthFirstSearch;
exports.UniformCostSearch = UniformCostSearch;
exports.SimpleUniformCostSearch = SimpleUniformCostSearch;
exports.SimpleAStarSearch = SimpleAStarSearch;
exports.SimpleGreedySearch = SimpleGreedySearch;
var libUtility = require('./utility.js');

function DepthFirstSearch(problem) {
  var fringe = [];
  var closed = {};
  var result = null;

  // Create start node with empty path
  var startnode = { state: problem.getStartState() };
  var node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) {
    // eslint-disable-line no-constant-condition
    problem.forEachSuccessor(node.state, function (successor) {
      // eslint-disable-line no-loop-func
      // Test for goal state (before-push)
      if (problem.isGoalState(successor)) {
        // Goal found
        result = successor;
        return;
      }

      // Avoid already pushed states (graph search)
      var successorHash = problem.computeHash(successor);
      if (libUtility.isUndefined(closed[successorHash])) {
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

function BreadthFirstSearch(problem) {
  var fringe = [];
  var closed = {};

  var startnode = { state: problem.getStartState() };
  var node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) {
    // eslint-disable-line no-constant-condition
    // eslint-disable-next-line no-loop-func
    problem.forEachSuccessor(node.state, function (successor) {
      var successorHash = problem.computeHash(successor);
      if (libUtility.isUndefined(closed[successorHash])) {
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

function UniformCostSearch(problem) {
  var fringe = new libUtility.PriorityQueue('cost');
  var closed = {};

  var startnode = { state: problem.getStartState(), cost: 0.0 };
  var node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = { state: node.state, prevCost: node.cost };

  while (true) {
    // eslint-disable-line no-constant-condition
    // eslint-disable-next-line no-loop-func
    problem.forEachSuccessor(node.state, function (successor, successorCost) {
      var successorHash = problem.computeHash(successor);
      var varSuccessor = closed[successorHash];
      if (libUtility.isUndefined(varSuccessor) || node.cost + successorCost < varSuccessor.prevCost) {
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

function SimpleUniformCostSearch(problem) {
  var fringe = new libUtility.PriorityQueue('cost');
  var closed = {};

  var startnode = { state: problem.getStartState(), cost: 0.0 };
  var node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) {
    // eslint-disable-line no-constant-condition
    // eslint-disable-next-line no-loop-func
    problem.forEachSuccessor(node.state, function (successor, successorCost) {
      var successorHash = problem.computeHash(successor);
      if (libUtility.isUndefined(closed[successorHash])) {
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

function SimpleAStarSearch(problem) {
  var fringe = new libUtility.PriorityQueue('cost');
  var closed = {};

  var CHECK_CONSISTENCY = false;

  var startnode = { state: problem.getStartState(), f: 0.0, g: 0.0 };
  var node = startnode;
  if (problem.isGoalState(node.state)) {
    return node.state;
  } // Start state is goal
  closed[problem.computeHash(node.state)] = node.state;

  while (true) {
    // eslint-disable-line no-constant-condition
    // eslint-disable-next-line no-loop-func
    problem.forEachSuccessor(node.state, function (successor, successorCost) {
      var h = problem.heuristic(successor);
      var g = successorCost;
      if (CHECK_CONSISTENCY && g + h < node.f) {
        throw new Error('Inconsistency found in A*-search heuristic');
      }
      var successorHash = problem.computeHash(successor);
      if (libUtility.isUndefined(closed[successorHash])) {
        fringe.push({ state: successor, f: g + h, g: g });
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

function SimpleGreedySearch(problem) {
  var startstate = problem.getStartState();
  var state = startstate;
  if (problem.isGoalState(state)) {
    return state;
  } // Start state is goal

  var cheapestCost = Number.MAX_VALUE;
  var cheapestSuccessor = void 0;
  while (true) {
    // eslint-disable-line no-constant-condition
    cheapestSuccessor = null;
    // eslint-disable-next-line no-loop-func
    problem.forEachSuccessor(state, function (successor, successorCost) {
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