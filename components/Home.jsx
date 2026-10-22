import { ArrowUpRight, Code2, ScanLine, Download } from "lucide-react";
import { homeCopy } from "../src/home-copy";
export default function Home({ locale }) {
  const c = homeCopy[locale] || homeCopy.en;
  const icons = [Code2, ScanLine, Download];
  return <div className="home-page">
    <section className="home-intro">
      <div className="home-message"><h1>{c.title}</h1><p>{c.intro}</p><div className="home-actions"><a className="home-primary" href="#figures">{c.start}<ArrowUpRight size={19} aria-hidden="true" /></a><a href="#course/square">{c.lesson}</a></div><p className="home-assurance">{c.foot}</p></div>
      <a className="home-demo" href="#course/square" aria-label={c.open}>
        <div className="home-window"><span aria-hidden="true">● ● ●</span><span>square.js</span><ArrowUpRight size={18} aria-hidden="true" /></div>
        <div className="home-demo-panes"><div className="home-code"><span>{c.code}</span><pre><code><span className="home-syntax">color</span>("DeepSkyBlue");{"\n"}<span className="home-syntax">width</span>(4);{"\n"}<span className="home-syntax">goto</span>(-80, -80);{"\n\n"}<span className="home-keyword">for</span> (let i = 0; i &lt; 4; i++) {"{"}{"\n"}  <span className="home-syntax">forward</span>(160);{"\n"}  <span className="home-syntax">right</span>(90);{"\n"}{"}"}</code></pre></div><div className="home-result"><span>{c.drawing}</span><svg viewBox="0 0 240 240" role="img" aria-label={c.hint}><path d="M40 200V40H200V200Z" fill="none" stroke="DeepSkyBlue" strokeWidth="4" strokeLinejoin="round"/><path d="m40 192-6 13h12Z" fill="var(--accent)"/></svg></div></div><p className="home-demo-caption">{c.hint}<span>{c.open}</span></p>
      </a>
    </section>
    <section className="home-features" aria-label={c.start}>{c.features.map(([title, text], i) => { const Icon = icons[i]; return <a key={title} href={["#figures", "#course/functions", "#course/pen-journey"][i]}><Icon size={25} aria-hidden="true"/><h2>{title}</h2><p>{text}</p><ArrowUpRight size={18} aria-hidden="true" /></a>; })}</section>
  </div>;
}
