import {parser} from "@lezer/javascript";
import {reference} from "./reference.js";

// A deliberately bounded native-generator prototype, not a JavaScript interpreter.
const asynchronous = new Set(["onKey","onClick","requestAnimationFrame","cancelAnimationFrame","setTimeout","clearTimeout","setInterval","clearInterval"]);
const calls = new Set(reference.filter(entry => !asynchronous.has(entry.name)).flatMap(entry => [entry.name,entry.alias].filter(Boolean)));
const allowed = new Set(["Script","Block","VariableDeclaration","VariableDefinition","VariableName","ExpressionStatement","CallExpression","ArgList","Number","String","BooleanLiteral","Null","BinaryExpression","UnaryExpression","AssignmentExpression","PostfixExpression","ParenthesizedExpression","ForStatement","ForSpec","WhileStatement","IfStatement","BreakStatement","ContinueStatement","LineComment","BlockComment","EmptyStatement"]);
export function analyzeDebugSource(source) {
  if (source.length > 50000) throw Error("Debugger prototype: maximum source length is 50,000 characters.");
  const tree=parser.parse(source), points=[], markers=new Map(), names=new Set(), conditions=[];
  const walk=node=>{
    const name=node.name;
    if(node.type.isError) throw Error("Debugger prototype: fix the JavaScript syntax first.");
    if(name === "var" || name === "do" || name === "yield" || name === "await") throw Error("Debugger prototype: use let/const and braced for/while/if statements.");
    if(node.type.isAnonymous || /^[^a-zA-Z]+$/.test(name) || ["let","const","for","while","if","else","break","continue","true","false","null","ArithOp","CompareOp","LogicOp","BitOp","UpdateOp","Equals"].includes(name)) {}
    else if(!allowed.has(name)) throw Error(`Debugger prototype: unsupported syntax (${name}). Use normal Run.`);
    if(name === "Block" && ["ForStatement","WhileStatement"].includes(node.parent?.name)) {const offset=node.from+1;points.push(offset);markers.set(offset,{source:source.slice(node.parent.from,node.from).trim().slice(0,500),kind:"body"});}
    if(name === "VariableName" || name === "VariableDefinition") {
      const value=source.slice(node.from,node.to);
      if(value.startsWith("__kaplumDebug")) throw Error("Debugger prototype: reserved variable prefix.");
      if(name === "VariableDefinition") names.add(value);
    }
    if(name === "CallExpression") {
      const target=node.firstChild;
      if(target?.name !== "VariableName" || !calls.has(source.slice(target.from,target.to))) throw Error("Debugger prototype: only direct teaching-command calls are supported.");
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
    if(["VariableDeclaration","ExpressionStatement","ForStatement","WhileStatement","IfStatement","BreakStatement","ContinueStatement"].includes(name) && ["Script","Block"].includes(node.parent?.name)) {points.push(node.from);const control=["ForStatement","WhileStatement","IfStatement"].includes(name);markers.set(node.from,{source:source.slice(node.from,control ? node.getChild("Block").from : node.to).trim().slice(0,500),kind:control ? "control" : "statement"});}
    for(let child=node.firstChild;child;child=child.nextSibling) walk(child);
  };
  walk(tree.topNode);
  if(names.size>100 || points.length>2000) throw Error("Debugger prototype: source exceeds the variable/statement budget.");
  const captures=[...names].map(name=>`[${JSON.stringify(name)},()=>${name}]`).join(",");
  const edits=[];
  const offsets=[...new Set(points)].sort((a,b)=>b-a);
  for(const offset of offsets) {
    const line=source.slice(0,offset).split("\n").length;
    edits.push({from:offset,to:offset,text:`yield {line:${line},source:${JSON.stringify(markers.get(offset).source)},kind:${JSON.stringify(markers.get(offset).kind)},bindings:[${captures}]};`});
  }
  for(const condition of conditions) {
    const expression=source.slice(condition.from,condition.to).trim() || "true";
    edits.push({from:condition.from,to:condition.to,text:`(yield {line:${condition.line},source:${JSON.stringify(expression.slice(0,500))},kind:"condition",control:${JSON.stringify(condition.control)},result:!!(${expression}),bindings:[${captures}]})`});
  }
  let code=source;
  for(const edit of edits.sort((a,b)=>b.from-a.from)) code=code.slice(0,edit.from)+edit.text+code.slice(edit.to);
  return {code,lines:[...new Set(offsets.map(offset=>source.slice(0,offset).split("\n").length))].sort((a,b)=>a-b)};
}

export function compileDebugSource(source) {return analyzeDebugSource(source).code;}
