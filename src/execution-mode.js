import {parser} from '@lezer/javascript';
// UI hints only: recordDrawing remains the authority on recording safety.
export function executionMode(source) {
 let frames=false, live=false;
 const tree=parser.parse(source);
 tree.iterate({enter(node) {
  if (['VariableName','PropertyName'].includes(node.name)) {
   const name=source.slice(node.from,node.to);
   if (['requestAnimationFrame','naechstesBild'].includes(name)) frames=true;
   if (['setTimeout','setInterval','verzoegere','wiederholeZeitlich','onKey','onClick','beiTaste','beiKlick'].includes(name)) live=true;
  }
  if (['await','async'].includes(node.name)) live=true;
 }});
 return live?'live':frames?'animation':'drawing';
}
