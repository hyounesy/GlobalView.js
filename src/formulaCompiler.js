const libUtility = require('./utility.js')

export const FormulaCompiler = {
  compile: function (formula, symbolTypes) {
    /* // Parse case-insensitive
    formula = formula.toLowerCase(); */

    // Error handler
    let err = null;
    function error(msg) {
      err = msg;
      return null;
    }

    // >>> Types

    FormulaCompiler.types.vec3.memberTypes = {
      x: FormulaCompiler.types.float,
      y: FormulaCompiler.types.float,
      z: FormulaCompiler.types.float
    }
    /**
     * An enum, mapping function signatures to return types
     * @enum {Object}
     */
    const functionsReturnTypes = {
      'float = float': FormulaCompiler.types.float,
      'float += float': FormulaCompiler.types.float,
      'float -= float': FormulaCompiler.types.float,
      'float *= float': FormulaCompiler.types.float,
      'float /= float': FormulaCompiler.types.float,
      'float + float': FormulaCompiler.types.float,
      'float - float': FormulaCompiler.types.float,
      'float * float': FormulaCompiler.types.float,
      'float / float': FormulaCompiler.types.float,

      'vec3(float, float, float)': FormulaCompiler.types.vec3,
      'vec3 = vec3': FormulaCompiler.types.vec3,
      'vec3 + vec3': FormulaCompiler.types.vec3,
      'vec3 * float': FormulaCompiler.types.vec3,

      'sin(float)': FormulaCompiler.types.float,
      'cos(float)': FormulaCompiler.types.float,
      'tan(float)': FormulaCompiler.types.float,
      'asin(float)': FormulaCompiler.types.float,
      'acos(float)': FormulaCompiler.types.float,
      'atan(float)': FormulaCompiler.types.float,
      /* 'pow': FormulaCompiler.types.float,
      'exp': FormulaCompiler.types.float,
      'log': FormulaCompiler.types.float,
      'exp2': FormulaCompiler.types.float,
      'log2': FormulaCompiler.types.float,
      'sqrt': FormulaCompiler.types.float,
      'inversesqrt': FormulaCompiler.types.float,
      'abs': FormulaCompiler.types.float,
      'sign': FormulaCompiler.types.float,
      'floor': FormulaCompiler.types.float,
      'ceil': FormulaCompiler.types.float,
      'fract': FormulaCompiler.types.float,
      'mod': FormulaCompiler.types.float, */
      'min(float, float)': FormulaCompiler.types.float,
      'max(float, float)': FormulaCompiler.types.float,
      /* 'clamp': FormulaCompiler.types.float,
      'mix': FormulaCompiler.types.float,
      'step': FormulaCompiler.types.float,
      'smoothstep': FormulaCompiler.types.float,
      'length': FormulaCompiler.types.float,
      'distance': FormulaCompiler.types.float,
      'dot': FormulaCompiler.types.float,
      'cross': FormulaCompiler.types.float,
      'normalize': FormulaCompiler.types.float, */
    }

    // >>> Tokenizer

    let chrPos = 0,
      chr = formula.charAt(0),
      curTok = null,
      curVal;
    function getch() {
      return chr = formula.charAt(++chrPos);
    }
    function getTok() {
      let sign = 1,
        repeat = false;
      do {
        repeat = false;
        switch (chr) {
          case '':
            curTok = null; // End
            return true;
          case '+':
            switch (getch()) {
              case '+': getch(); curTok = '++'; return true;
              case '=': getch(); curTok = '+='; return true;
              default: curTok = '+'; return true;
            }
          case '-':
            switch (getch()) {
              case '-': getch(); curTok = '--'; return true;
              case '=': getch(); curTok = '-='; return true;
              default:
                if (chr >= '0' && chr <= '9') {
                  sign = -1; break;
                } else {
                  curTok = '-'; return true;
                }
            }
          case '*':
            switch (getch()) {
              case '=': getch(); curTok = '*='; return true;
              default: curTok = '*'; return true;
            }
          case '/':
            switch (getch()) {
              case '=': getch(); curTok = '/='; return true;
              default: curTok = '/'; return true;
            }
          case '(': case ')': case ',': case '=': case ';': case '.': // Misc. recognized characters
            curTok = chr;
            getch();
            return true;
          case ' ': case '\t': case '\r': case '\n': // Ignored characters
            getch();
            repeat = true;
        }
      }
      while (repeat);

      if (chr >= '0' && chr <= '9') {
        let numberString = chr,
          hasDot = false;
        while (getch() !== '') {
          if (chr >= '0' && chr <= '9') {
            numberString += chr;
          } else if (chr !== '.') {
            break;
          } else if (hasDot) {
            // More than one '.' inside number string
            return error('Unexpected character: ' + chr);
          } else {
            hasDot = true;
            numberString += chr;
          }
        }
        if (hasDot) {
          curTok = 'float';
          curVal = sign * Number.parseFloat(numberString);
        } else {
          curTok = 'int';
          curVal = sign * Number.parseInt(numberString, 10);
        }
        return true;
      }

      if ((chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z')) {
        let str = chr;
        while (getch() !== '') {
          if ((chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z') || (chr >= '0' && chr <= '9') || chr === '_') {
            str += chr;
          } else {
            break;
          }
        }
        curTok = 'identifier';
        curVal = str;
        return true;
      }

      return error('Unexpected character: ' + chr);
    }
    function getOperatorPrecedence(tok) {
      switch (tok) {
        case '=': return 10; // lowest
        case '+=': return 10;
        case '-=': return 10;
        case '*=': return 10;
        case '/=': return 10;
        case '?': return 20;
        case '||': return 30;
        case '&&': return 40;
        case '==': return 50;
        case '<': return 60;
        case '>': return 60;
        case '+': return 70;
        case '-': return 70;
        case '*': return 80;
        case '/': return 80;
        case '%': return 80; // highest.
        default: return -1; // Not an operator
      }
    }

    // >>> Abstract Syntax Tree builder

    function buildAST() {
      const scope = symbolTypes ? symbolTypes : {};

      function prefixOpAST(op) {
        if (!libUtility.isString(curTok)) {
          return error("Expected variable after prefix operator '" + op + "'");
        }

        return [op, curTok];
      }
      function bineryOpAST(exprPrec, lhs) {
        // If this is a binop, find its precedence.
        while (true) {
          const tokPrec = getOperatorPrecedence(curTok);

          // If this is an operator that binds at least as tightly as the current binop, consume it, otherwise return lhs
          if (tokPrec < exprPrec) {
            return lhs;
          }
          // curTok is an operator

          const binOp = curTok;
          if (!getTok()) {
            return null;
          }  // eat binop

          if (binOp !== '?') {
            // Parse the expression after the binary operator.
            let rhs = exprAST(tokPrec);
            if (rhs === null) {
              return null;
            }

            // If binOp binds less tightly with rhs than the operator after rhs, let the pending operator take rhs as its lhs.
            const nextPrec = getOperatorPrecedence(curTok);
            if (tokPrec < nextPrec) {
              rhs = bineryOpAST(tokPrec + 1, rhs);
              if (rhs == null) {
                return null;
              }
            }

            // Create operator function signature from operator name and argument FormulaCompiler.types
            const funcSignature = lhs.type.name + ' ' + binOp + ' ' + rhs.type.name;

            // Lookup operator function and return type
            const returnType = functionsReturnTypes[funcSignature];
            if (libUtility.isUndefined(returnType)) {
              return error('Undefined operator ' + binOp + ' on FormulaCompiler.types ' + lhs.type.name + ' and ' + rhs.type.name);
            }

            // Merge lhs/rhs.
            if (tokPrec === 10) {
              // If binOp is '=', '+=' or '-='
              const lastOp = lhs.code.pop();
              if (lastOp !== '@' && lastOp !== '@[]') {
                return error('Cannot assign to non-variable');
              }

              // Store as rhs, lhs, funcSignature
              lhs.type = returnType;
              lhs.code = rhs.code.concat(lhs.code);
              lhs.code.push(funcSignature);
            } else {
              // Store as lhs, rhs, funcSignature
              lhs.type = returnType;
              lhs.code = lhs.code.concat(rhs.code);
              lhs.code.push(funcSignature);
            }
          }
        }
      }
      function identifierAST() {
        const identifier = curVal;
        const variable = [identifier];
        if (!getTok()) {
          return null;
        } // eat identifier

        // Query variable type from scope
        let type = scope[identifier];

        while (curTok === '.') {
          if (!getTok()) {
            return null;
          } // eat '.'

          if (libUtility.isUndefined(type)) {
            return error('Undefined variable: ' + identifier);
          }
          const parentType = type;
          const member = type.members[curVal];
          if (libUtility.isUndefined(member)) {
            return error(parentType.name + ' does not contain a member: ' + curVal);
          }
          type = member.type;

          variable.push('.');
          variable.push(member.index);

          if (!getTok()) {
            return null;
          } // eat identifier
        }

        if (curTok === '(') {
          if (variable.length !== 1) {
            return error('Member functions not suported');
          }
          return functionAST(identifier); // Function call
        }

        if (curTok === 'identifier') {
          if (variable.length !== 1) {
            return error('Hierarchical FormulaCompiler.types not suported');
          }
          return varDeclAST(variable, identifier); // Variable declaration
        }

        if (libUtility.isUndefined(type)) {
          return error('Undefined variable: ' + identifier);
        }

        variable.push(type === FormulaCompiler.types.float ? '@' : '@[]');
        return { code: variable, type: type }; // Variable reference
      }
      function identifierAndPostAST() {
        const identifier = identifierAST();
        if (!identifier) {
          return null;
        }

        return identifier;
      }
      function numberAST() {
        const number = curVal;
        if (!getTok()) {
          return null;
        } // Eat number
        return { code: [number], type: FormulaCompiler.types.float };
      }
      function varDeclAST(type, typeName) {
        type = FormulaCompiler.types[typeName];
        if (libUtility.isUndefined(type)) {
          return error('Unsupported type: ' + typeName);
        }

        // Update scope
        const prev = scope[curVal];
        if (!libUtility.isUndefined(prev)) {
          return error('Redefinition of variable: ' + curVal);
        }
        scope[curVal] = type; // Store variable type in scope

        const variable = [curVal];
        if (!getTok()) {
          return null;
        } // eat identifier

        /* var decl = [type].concat(variable);
        decl.push('#');
        return { code: decl, type: type }; */
        variable.push(type === FormulaCompiler.types.float ? '@' : '@[]');
        return { code: variable, type: type };
      }
      function functionAST(funcName) {
        if (!getTok()) {
          return null;
        } // Eat '('

        const args = listAST(')');
        if (!args) {
          return null;
        }
        const numArgs = args.type.length;

        // Create function signature from function name and argument FormulaCompiler.types
        const argTypeNames = args.type.map(type => type.name).join(', ')
        const funcSignature = funcName + '(' + argTypeNames + ')';

        // Lookup function and return type
        const returnType = functionsReturnTypes[funcSignature];
        if (libUtility.isUndefined(returnType)) {
          return error('Undefined function ' + funcSignature);
        }

        // Store as args, funcSignature
        const funcCode = args.code;
        funcCode.push(funcSignature)
        return { code: funcCode, type: returnType };
      }
      function listAST(termTok) {
        if (curTok === termTok) {
          if (!getTok()) {
            return null;
          } // Eat termTok
          return [0]; // List of length 0
        }

        let code = [];
        const typeList = [];
        let len = 1;
        while (true) {
          const expr = exprAST();
          if (!expr) {
            return null;
          }
          code = code.concat(expr.code);
          typeList.push(expr.type);

          if (curTok === termTok) {
            break;
          } else if (curTok !== ',') {
            return error("Expected ',' or '" + termTok + "' after list element");
          }
          if (!getTok()) {
            return null;
          } // Eat ','
          ++len;
        }
        if (!getTok()) {
          return null;
        } // Eat termTok
        return { code: code, type: typeList };
      }
      function primaryAST() {
        switch (curTok) {
          case 'identifier': return identifierAndPostAST();
          case 'float': case 'int': return numberAST();
          default: return error("unknown token '{0}' when expecting an expression".format(curTok));
        /* case (int)Lexer.Token.tok_int: return ParseIntExpr();
        case (int)Lexer.Token.tok_float: return ParseFloatExpr();
        case (int)Lexer.Token.tok_string: return ParseStringExpr();
        case (int)Lexer.Token.tok_bool: return ParseBooleanExpr();
        case '(': return ParseParenExpr();
        case '[': return ParseArrayExpr('[', ']');
        case (int)Lexer.Token.tok_return: return ParseReturnExpr();
        case (int)Lexer.Token.tok_new: return ParseNewExpr();
        case (int)Lexer.Token.tok_pp:
          Position ppBegin = getTokenStartPosition();
          if (!getTok()) return null; // eat '++'
          VAR = ParseIdentifierExpr();
          if (VAR == null) return null;
          if (!(VAR is VariableExprAST || VAR is IndexExprAST)) return Error("Expected variable after prefix increment operator");
          return new PrefixIncrementExprAST(new Segment(ppBegin, VAR.source.end), VAR);
        case (int)Lexer.Token.tok_mm:
          Position mmBegin = getTokenStartPosition();
          if (!getTok()) return null; // eat '--'
          VAR = ParseIdentifierExpr();
          if (VAR == null) return null;
          if (!(VAR is VariableExprAST || VAR is IndexExprAST)) return Error("Expected variable after prefix decrement operator");
          return new PrefixDecrementExprAST(new Segment(mmBegin, VAR.source.end), VAR); */
        }
      }
      /**
       * @param  {number=} exprPrec=0
       */
      function exprAST(exprPrec) {
        if (libUtility.isUndefined(exprPrec)) {
          exprPrec = 0;
        }

        const lhs = primaryAST();
        if (!lhs) {
          return null;
        }
        return bineryOpAST(exprPrec, lhs);
      }
      function topLevelAST() {
        let code = [];
        if (!getTok()) {
          return null;
        } // Get first token
        while (curTok !== null) {
          const lhs = primaryAST();
          if (!lhs) {
            return null;
          }

          const binOp = bineryOpAST(0, lhs);
          if (!binOp) {
            return null;
          }

          if (curTok !== ';') {
            return error("Missing ';' after expression");
          }
          if (!getTok()) {
            return null;
          } // Eat ';'

          code = code.concat(binOp.code);
          code.push(';'); // Clear operation
        }

        if (code.length !== 0) {
          code.pop();
        } // Don't clear after last operation. Result of last operation is return value

        return code;
      }

      const expr = topLevelAST();
      return expr ? expr : err;
    }


    return buildAST();
  },
  run: function (code, stack, global) {
    let IP = -1; // Instruction pointer
    let SP = 0; // Stack pointer
    let scope = global;

    let postOpScope;
    while (++IP < code.length) {
      postOpScope = global; // By default, reset scope after operation
      switch (code[IP]) {
        case 'float = float': scope[stack[--SP]] = stack[SP - 1]; break;
        case 'float += float': scope[stack[--SP]] += stack[--SP]; break;
        case 'float -= float': scope[stack[--SP]] -= stack[--SP]; break;
        case 'float *= float': scope[stack[--SP]] *= stack[--SP]; break;
        case 'float /= float': scope[stack[--SP]] /= stack[--SP]; break;
        case 'float + float': stack[SP - 2] += stack[--SP]; break;
        case 'float * float': stack[SP - 2] *= stack[--SP]; break;
        case 'float / float': stack[SP - 2] /= stack[--SP]; break;

        case 'sin(float)': stack[SP - 1] = Math.sin(stack[SP - 1]); break;
        case 'cos(float)': stack[SP - 1] = Math.cos(stack[SP - 1]); break;
        case 'tan(float)': stack[SP - 1] = Math.tan(stack[SP - 1]); break;
        case 'asin(float)': stack[SP - 1] = Math.asin(stack[SP - 1]); break;
        case 'acos(float)': stack[SP - 1] = Math.acos(stack[SP - 1]); break;
        case 'atan(float)': stack[SP - 1] = Math.atan(stack[SP - 1]); break;
          /* case 'pow': FormulaCompiler.types.float,
      case 'exp': FormulaCompiler.types.float,
      case 'log': FormulaCompiler.types.float,
      case 'exp2': FormulaCompiler.types.float,
      case 'log2': FormulaCompiler.types.float,
      case 'sqrt': FormulaCompiler.types.float,
      case 'inversesqrt': FormulaCompiler.types.float,
      case 'abs': FormulaCompiler.types.float,
      case 'sign': FormulaCompiler.types.float,
      case 'floor': FormulaCompiler.types.float,
      case 'ceil': FormulaCompiler.types.float,
      case 'fract': FormulaCompiler.types.float,
      case 'mod': FormulaCompiler.types.float, */
        case 'min(float, float)': stack[SP - 2] = Math.min(stack[SP - 2], stack[--SP]); break;
        case 'max(float, float)': stack[SP - 2] = Math.max(stack[SP - 2], stack[--SP]); break;
          /* case 'clamp': FormulaCompiler.types.float,
      case 'mix': FormulaCompiler.types.float,
      case 'step': FormulaCompiler.types.float,
      case 'smoothstep': FormulaCompiler.types.float,
      case 'length': FormulaCompiler.types.float,
      case 'distance': FormulaCompiler.types.float,
      case 'dot': FormulaCompiler.types.float,
      case 'cross': FormulaCompiler.types.float,
      case 'normalize': FormulaCompiler.types.float, */

        case 'vec3(float, float, float)': /* Nothing to do */
          break;
        case 'vec3 = vec3':
          scope[stack[--SP]] = [stack[SP - 3], stack[SP - 2], stack[SP - 1]];
          break;
        case 'vec3 + vec3':
          stack[SP - 6] += stack[SP - 3];
          stack[SP - 5] += stack[SP - 2];
          stack[SP - 4] += stack[SP - 1];
          SP -= 3;
          break;
        case 'vec3 * float':
          const f = stack[--SP];
          stack[SP - 3] *= f;
          stack[SP - 2] *= f;
          stack[SP - 1] *= f;
          break;

        case '@': stack[SP - 1] = scope[stack[SP - 1]]; break; // Load scalar from scope
        case '@[]': // Load array from scope
          const variable = scope[stack[--SP]];
          for (let i = 0; i < variable.length; ++i) {
            stack[SP++] = variable[i];
          }
          break;
        case '.': scope = scope[stack[--SP]]; // Dereference member
          postOpScope = scope; // Don't reset scope after operation
          break;
        case ';': SP = 0; break;

        default:
          stack[SP++] = code[IP];
          postOpScope = scope; // Don't reset scope after operation
      }
      scope = postOpScope;
    }
    return SP === 0 ? null : (SP === 1 ? stack[0] : stack.slice(0, SP));
  }
}
FormulaCompiler.types = {
  float: { name: 'float' },
  vec3: { name: 'vec3' }
};
FormulaCompiler.types.vec3.members = {
  x: {index: 0, type: FormulaCompiler.types.float},
  y: {index: 1, type: FormulaCompiler.types.float},
  z: {index: 2, type: FormulaCompiler.types.float}
};

function verboseTest(formula, symbols, symbolTypes) {
  const code = FormulaCompiler.compile(formula, symbolTypes ? symbolTypes : {});

  console.log('formula: ' + formula);
  if (libUtility.isString(code)) {
    console.log('err: ' + code);
  } else {
    const globalScope = symbols ? symbols : {};
    console.log('code: ' + code.map(c => libUtility.isString(c) ? '"' + c + '"' : c).join(' '));
    console.log('result: ' + FormulaCompiler.run(code, new Array(16), globalScope));
    console.log('locals: ' + JSON.stringify(globalScope));
  }
}

function verify(formula, result) {
  const code = FormulaCompiler.compile(formula);
  if (libUtility.isString(code)) {
    console.log("Formula '{0}' failed with error '{1}'".format(formula, code));
  } else {
    const computedResult = FormulaCompiler.run(code, new Array(16), {});

    let match;
    if (libUtility.isArray(result) && libUtility.isArray(computedResult) && result.length === computedResult.length) {
      match = true;
      for (let i = 0; i < result.length; ++i) {
        if (computedResult[i] !== result[i]) {
          match = false;
          break;
        }
      }
    } else {
      match = computedResult === result;
    }

    if (!match) {
      console.log("Formula '{0}' returned '{1}', instead of '{2}'".format(formula, computedResult, result));
    }
  }
  return true;
}

function benchmark(nIter, javascriptCode, formulaCode, evalCode) {
  let sum,
    tStart;

  sum = 0.0;
  tStart = performance.now();
  for (let i = 0; i < nIter; ++i) {
    sum += javascriptCode();
  }
  console.log(sum);
  console.log((performance.now() - tStart) + 'ms');

  sum = 0.0;
  tStart = performance.now();
  const code = FormulaCompiler.compile(formulaCode);
  const stack = new Array(16);
  for (let i = 0; i < nIter; ++i) {
    sum += FormulaCompiler.run(code, stack, {});
  }
  console.log(sum);
  console.log((performance.now() - tStart) + 'ms');

  sum = 0.0;
  tStart = performance.now();
  for (let i = 0; i < nIter; ++i) {
    sum += eval(evalCode);
  }
  console.log(sum);
  console.log((performance.now() - tStart) + 'ms');
}

/* benchmark(1000000, function() {
  var a = 3;
  var b = 4;
  return a * b / 2;
}, `
  float a = 3;
  float b = 4;
  a * b / 2;
`, `
  var a = 3;
  var b = 4;
  a * b / 2;
`); */

/* benchmark(10000, function() {
  var v = [4, 5, 6];
  return v[1];
}, `
  vec3 v = vec3(4, 5, 6);
  v.y;
`, `
  var v = [4, 5, 6];
  v[1];
`); */

// verboseTest("vec3 a = vec3(1, 2, 3);");

/* verify("1 + 6 * 2;", 13);
verify("max(1, 2);", 2);
verify("max(1 + 6, 2 * 3);", 7);
verify("float a = 123; a += 5; a;", 128);
verify("float a = max(3 + 3, 5); a;", 6);
verify("vec3 a = vec3(1, 2, 3); a.y;", 2);
verify("vec3 a = vec3(1, 2, 3); a.y *= 3; a;", [1, 6, 3]);
verify("vec3 a = vec3(1, 2, 3); a = a * 3; a;", [3, 6, 9]);
verify(`
  vec3 a = vec3(5, 5, 5);
  vec3 b = vec3(1, 2, 3);
  vec3 c = a + b;
  c;
`, [6, 7, 8]);
verify(`
  vec3 a = vec3(0, 1, 2);
  a.x = a.y;
  a;
`, [1, 1, 2]);
verify(`
  float a = 3;
  float b = 4;
  a * b / 2;
`, 6);

verboseTest("i;", {i: 123.5}, {i: FormulaCompiler.types.float}); */