import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment, StateEffect, StateField } from "@codemirror/state";
import { keymap, Decoration, WidgetType } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const debugLineEffect=StateEffect.define();
const debugLines=StateField.define({
  create:()=>Decoration.none,
  update(value,tr) {
    if(tr.docChanged) value=Decoration.none;
    for(const effect of tr.effects) if(effect.is(debugLineEffect)) {
      const line=effect.value;
      value=line && line<=tr.state.doc.lines ? Decoration.set([Decoration.line({class:"cm-debug-line"}).range(tr.state.doc.line(line).from)]) : Decoration.none;
    }
    return value;
  },
  provide:field=>EditorView.decorations.from(field)
});
const conditionEffect=StateEffect.define();
class ConditionNote extends WidgetType {
  constructor(text,result) {super();this.text=text;this.result=result;}
  eq(other) {return this.text===other.text && this.result===other.result;}
  toDOM() {const note=document.createElement("span");note.className="cm-condition-note";note.textContent=` // ${this.text}`;return note;}
}
const conditionLines=StateField.define({
  create:()=>Decoration.none,
  update(value,tr) {
    if(tr.docChanged) value=Decoration.none;
    for(const effect of tr.effects) if(effect.is(conditionEffect)) {
      const note=effect.value;
      if(!note || note.line>tr.state.doc.lines) {value=Decoration.none;continue;}
      const line=tr.state.doc.line(note.line);
      value=Decoration.set([
        Decoration.line({class:`cm-condition-${note.result ? "true" : "false"}`}).range(line.from),
        Decoration.widget({widget:new ConditionNote(note.text,note.result),side:1}).range(line.to)
      ],true);
    }
    return value;
  },
  provide:field=>EditorView.decorations.from(field)
});
const breakpointEffect=StateEffect.define();
const breakpointLines=StateField.define({
  create:()=>Decoration.none,
  update(value,tr) {
    if(tr.docChanged) value=Decoration.none;
    for(const effect of tr.effects) if(effect.is(breakpointEffect)) value=Decoration.set(effect.value.filter(line=>line>0 && line<=tr.state.doc.lines).sort((a,b)=>a-b).map(line=>Decoration.line({class:"cm-breakpoint-line"}).range(tr.state.doc.line(line).from)));
    return value;
  },
  provide:field=>EditorView.decorations.from(field)
});
// The CodeMirror document is the single editable program buffer.
export function createEditor(parent) {
  const theme = new Compartment();
  const attributes = new Compartment();
  const conditionWrapping = new Compartment();
  let changed = () => {};
  const view = new EditorView({
    parent,
    extensions: [
      basicSetup,
      debugLines,
      conditionLines,
      conditionWrapping.of([]),
      breakpointLines,
      javascript(),
      keymap.of([indentWithTab]),
      EditorState.tabSize.of(2),
      theme.of(oneDark),
      attributes.of(
        EditorView.contentAttributes.of({
          id: "code",
          "aria-label": "JavaScript code",
          "aria-multiline": "true",
          spellcheck: "false",
          autocapitalize: "off",
        }),
      ),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) changed();
      }),
    ],
  });
  return {
    get value() {
      return view.state.doc.toString();
    },
    set value(value) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    },
    onChange(callback) {
      changed = callback;
    },
    breakpoints(lines) {view.dispatch({effects:breakpointEffect.of(lines)});},
    showLine(line) {if(line>0 && line<=view.state.doc.lines) view.dispatch({effects:EditorView.scrollIntoView(view.state.doc.line(line).from,{y:"center"})});},
    condition(note) {view.dispatch({effects:[conditionEffect.of(note),conditionWrapping.reconfigure(note ? EditorView.lineWrapping : [])]});},
    debugLine(line) { view.dispatch({effects:debugLineEffect.of(line)}); },
    focus() {
      view.focus();
    },
    destroy() {
      view.destroy();
    },
    configure(mode, label) {
      view.dispatch({
        effects: [
          theme.reconfigure(mode === "dark" ? oneDark : []),
          attributes.reconfigure(
            EditorView.contentAttributes.of({
              id: "code",
              "aria-label": label,
              "aria-multiline": "true",
              spellcheck: "false",
              autocapitalize: "off",
            }),
          ),
        ],
      });
    },
  };
}
