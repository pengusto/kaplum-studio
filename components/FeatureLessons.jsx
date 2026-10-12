import {featureLessons,lessonCopy} from '../src/feature-lessons';
export default function FeatureLessons({locale}){
 const copy=lessonCopy[locale];
 return <section className="feature-lessons" aria-label={copy[0]}><h2>{copy[0]}</h2><p>{copy[1]}</p><div className="feature-lesson-grid">{featureLessons.map(item=><article className="studio-card" key={item.id}><h3>{item.title[locale]}</h3><p>{item.task[locale]}</p><code>{item.command}()</code><a className="button secondary" href={`#course/${item.id}`}>{copy[2]}</a></article>)}</div></section>;
}
