import {parser} from "@lezer/javascript";
import {reference} from "./reference.js";

// A deliberately bounded native-generator prototype, not a JavaScript interpreter.
const asynchronous = new Set(["onKey","onClick","requestAnimationFrame","cancelAnimationFrame","setTimeout","clearTimeout","setInterval","clearInterval"]);
const calls = new Set(reference.filter(entry => !asynchronous.has(entry.name)).flatMap(entry => [entry.name,entry.alias].filter(Boolean)));
const allowed = new Set(["Script","Block","VariableDeclaration","VariableDefinition","VariableName","ExpressionStatement","CallExpression","ArgList","Number","String","BooleanLiteral","Null","BinaryExpression","UnaryExpression","AssignmentExpression","PostfixExpression","ParenthesizedExpression","ForStatement","ForSpec","WhileStatement","IfStatement","BreakStatement","ContinueStatement","LineComment","BlockComment","EmptyStatement","FunctionDeclaration","ParamList","ReturnStatement"]);
export function analyzeDebugSource(source) {
  if (source.length > 50000) throw Error("Debugger prototype: maximum source length is 50,000 characters.");
  const tree=parser.parse(source), points=[], markers=new Map(), names=new Set(), conditions=[], functions=new Map(), userCalls=[];
  const collect=node=>{
    if(node.name === "FunctionDeclaration") {
      const binding=node.getChild("VariableDefinition"), params=node.getChild("ParamList"), body=node.getChild("Block");
      const name=binding && source.slice(binding.from,binding.to);
      if(!name || functions.has(name) || calls.has(name) || asynchronous.has(name)) throw Error("Debugger: use unique function names that do not replace teaching commands.");
      if(node.getChild("*")) throw Error("Debugger: authored generator functions are unsupported.");
      if(!body || !params || !["Script","Block"].includes(node.parent?.name)) throw Error("Debugger: use named function declarations.");
      for(let child=params.firstChild;child;child=child.nextSibling) if(!["(",")",",","VariableDefinition"].includes(child.name)) throw Error("Debugger: use plain parameters without defaults or rest syntax.");
      functions.set(name,{node,binding,body});
    }
    for(let child=node.firstChild;child;child=child.nextSibling) collect(child);
  };
  collect(tree.topNode);
  const walk=node=>{
    const name=node.name;
    if(node.type.isError) throw Error("Debugger prototype: fix the JavaScript syntax first.");
    if(name === "var" || name === "do" || name === "yield" || name === "await") throw Error("Debugger prototype: use let/const and braced for/while/if statements.");
    if(node.type.isAnonymous || /^[^a-zA-Z]+$/.test(name) || ["let","const","for","while","if","else","break","continue","function","return","true","false","null","ArithOp","CompareOp","LogicOp","BitOp","UpdateOp","Equals"].includes(name)) {}
    else if(!allowed.has(name)) throw Error(`Debugger prototype: unsupported syntax (${name}). Use normal Run.`);
    if(name === "Block" && ["ForStatement","WhileStatement"].includes(node.parent?.name)) {const offset=node.from+1;points.push(offset);markers.set(offset,{source:source.slice(node.parent.from,node.from).trim().slice(0,500),kind:"body"});}
    if(name === "VariableName" || name === "VariableDefinition") {
      const value=source.slice(node.from,node.to);
      if(value.startsWith("__kaplumDebug")) throw Error("Debugger prototype: reserved variable prefix.");
      if(functions.has(value)) {
        const declaration=functions.get(value).binding;
        const isDeclaration=node.from === declaration.from && node.to === declaration.to;
        const isCall=node.parent?.name === "CallExpression" && node.parent.firstChild.from === node.from;
        if(!isDeclaration && !isCall) throw Error("Debugger: own functions can only be called directly; aliases and shadowing are unsupported.");
      }
      if(name === "VariableDefinition" && node.parent?.name !== "FunctionDeclaration") names.add(value);
    }
    if(name === "ReturnStatement") {
      let parent=node.parent;
      while(parent && parent.name !== "FunctionDeclaration") parent=parent.parent;
      if(!parent) throw Error("Debugger: return must be inside an own function.");
    }
    if(name === "CallExpression") {
      const target=node.firstChild;
      if(target?.name !== "VariableName" || !calls.has(source.slice(target.from,target.to)) && !functions.has(source.slice(target.from,target.to))) throw Error("Debugger: only direct teaching-command or own-function calls are supported.");
      if(functions.has(source.slice(target.from,target.to))) userCalls.push(node);
    }
    if(["ForStatement","WhileStatement","IfStatement"].includes(name)) {
      let from,to;
      if(name === "ForStatement") {
        const spec=node.getChild("ForSpec");
        // The first semicolon may belong to the initializer declaration.
        const semicolons=[];
        const find=n=>{if(n.name === ";") semicolons.push(n);else for(let c=n.firstChild;c;c=c.nextSibling) find(c);};
        find(spec);
        from=semicolons[0].to;to=semicolons[1].from;
      } else {
        const expression=node.getChild("ParenthesizedExpression");
        from=expression.from+1;to=expression.to-1;
      }
      conditions.push({from,to,line:source.slice(0,node.from).split("\n").length,control:name === "IfStatement" ? "if" : "loop"});
      for(let child=node.firstChild;child;child=child.nextSibling) {
        if((child.name.endsWith("Statement") || child.name === "VariableDeclaration") && child.name !== "Block") throw Error("Debugger prototype: put every loop/if branch inside braces.");
      }
      if(!node.getChild("Block")) throw Error("Debugger prototype: put every loop/if branch inside braces.");
    }
    if(["VariableDeclaration","ExpressionStatement","ForStatement","WhileStatement","IfStatement","BreakStatement","ContinueStatement","ReturnStatement"].includes(name) && ["Script","Block"].includes(node.parent?.name)) {points.push(node.from);const control=["ForStatement","WhileStatement","IfStatement"].includes(name);markers.set(node.from,{source:source.slice(node.from,control ? node.getChild("Block").from : node.to).trim().slice(0,500),kind:control ? "control" : name === "ReturnStatement" ? "return" : "statement"});}
    for(let child=node.firstChild;child;child=child.nextSibling) walk(child);
  };
  walk(tree.topNode);
  if(names.size>100 || points.length+functions.size>2000) throw Error("Debugger prototype: source exceeds the variable/statement budget.");
  const captures=[...names].map(name=>`[${JSON.stringify(name)},()=>${name}]`).join(",");
  const edits=[];
  // At shared offsets, starts nest as prologue → entry → statement → condition → call.
  // Higher priorities are applied first, so their text ends up inside the outer insertion.
  const insert=(offset,text,priority=0)=>edits.push({from:offset,to:offset,text,priority});
  for(const [name,{node,body}] of functions) {
    const keyword=node.getChild("function");
    insert(keyword.to,"*");
    insert(body.from+1,`__kaplumDebugStack.push(${JSON.stringify(name)});if(__kaplumDebugStack.length>64)throw Error("Debugger: maximum call depth is 64.");try{`, -1);
    insert(body.to-1,"}finally{__kaplumDebugStack.pop();}");
    const offset=body.from+1;
    insert(offset,`yield {line:${source.slice(0,node.from).split("\n").length},source:${JSON.stringify(source.slice(node.from,body.from).trim().slice(0,500))},kind:"function",bindings:[${captures}],stack:[...__kaplumDebugStack]};`,-0.5);
  }
  for(const call of userCalls) {insert(call.from,"(yield* ",2);insert(call.to,")",0);}
  const offsets=[...new Set(points)].sort((a,b)=>b-a);
  for(const offset of offsets) {
    const line=source.slice(0,offset).split("\n").length;
    edits.push({from:offset,to:offset,priority:0,text:`yield {line:${line},source:${JSON.stringify(markers.get(offset).source)},kind:${JSON.stringify(markers.get(offset).kind)},bindings:[${captures}],stack:[...__kaplumDebugStack]};`});
  }
  for(const condition of conditions) {
    const expression=source.slice(condition.from,condition.to).trim() || "true";
    insert(condition.from,`(yield {line:${condition.line},source:${JSON.stringify(expression.slice(0,500))},kind:"condition",control:${JSON.stringify(condition.control)},result:!!(`,1);
    if(!source.slice(condition.from,condition.to).trim()) insert(condition.from,"true",2);
    insert(condition.to,`),bindings:[${captures}],stack:[...__kaplumDebugStack]})`,condition.from === condition.to ? 3 : 1);
  }
  let code=source;
  for(const edit of edits.sort((a,b)=>b.from-a.from || (b.priority||0)-(a.priority||0))) code=code.slice(0,edit.from)+edit.text+code.slice(edit.to);
  code="const __kaplumDebugStack=[];"+code;
  return {code,lines:[...new Set([...offsets,...[...functions.values()].map(f=>f.node.from)].map(offset=>source.slice(0,offset).split("\n").length))].sort((a,b)=>a-b)};
}

export function compileDebugSource(source) {return analyzeDebugSource(source).code;}
