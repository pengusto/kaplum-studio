import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment, StateEffect, StateField } from "@codemirror/state";
import { keymap, Decoration } from "@codemirror/view";
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
// The CodeMirror document is the single editable program buffer.
export function createEditor(parent) {
  const theme = new Compartment();
  const attributes = new Compartment();
  let changed = () => {};
  const view = new EditorView({
    parent,
    extensions: [
      basicSetup,
      debugLines,
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
