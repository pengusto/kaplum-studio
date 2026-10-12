import {inspectionCopy} from '../src/inspection-copy';
const number=value=>value.toFixed(1);
function rows(state,c){return [
 ['position',`x: ${number(state.x)} · y: ${number(state.y)}`],['heading',`${number(state.angleDeg)}°`],['pen',state.pen?c.down:c.up],['penColor',state.penColor],['lineWidth',number(state.lineWidth)],['visible',state.visible?c.yes:c.no],['stampCount',String(state.stampCount)]
];}
export function TurtleState({state,locale}){
 const c=inspectionCopy[locale];
 return <dl className="inspection-values">{state?rows(state,c).map(([key,value])=><div key={key}><dt>{c[key]}</dt><dd>{key==='penColor'&&<span className="inspection-swatch" style={{backgroundColor:value}} aria-hidden="true"/>}{value}</dd></div>):<div><dt>{c.position}</dt><dd>—</dd></div>}</dl>;
}
export function DrawingStep({playback,locale}){
 const c=inspectionCopy[locale],detail=playback.detail;
 if(!detail)return null;
 const {before,after,effects}=detail;
 const changed=[];
 if(before.x!==after.x||before.y!==after.y)changed.push(c.move);
 if(before.angleDeg!==after.angleDeg)changed.push(c.turn);
 if(before.pen!==after.pen)changed.push(c.penChange);
 if(before.penColor!==after.penColor||before.lineWidth!==after.lineWidth)changed.push(c.style);
 if(before.visible!==after.visible)changed.push(c.visibility);
 if(before.stampCount!==after.stampCount)changed.push(c.stamps);
 for(const [key,count] of Object.entries(effects))if(count)changed.push(`${c[key]} × ${count}`);
 const b=rows(before,c),a=rows(after,c);
 return <section className="drawing-step" aria-label={c.step}><h3>{c.step} · {playback.step} / {playback.total}</h3>{!playback.step?<p>{c.initial}</p>:<>
 <ul>{(changed.length?changed:[c.quiet]).map(change=><li key={change}>{change}</li>)}</ul>
 <div className="inspection-table"><table><thead><tr><th scope="col">{c.step}</th><th scope="col">{c.before}</th><th scope="col">{c.after}</th></tr></thead><tbody>{a.map(([key,value],i)=><tr key={key} data-changed={value!==b[i][1]}><th scope="row">{c[key]}</th><td>{b[i][1]}</td><td>{value}</td></tr>)}</tbody></table></div>
 </>}<small>{c.boundary}</small></section>;
}
