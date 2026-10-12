"use client";
import {useState} from 'react';
import {parser} from '@lezer/javascript';
import {assetUrl} from '../src/asset-url';
const copy={
 en:['How this example is built','Maintained example helper, not a Turtle primitive. Viewing it does not replace your program.','Loading source…','Source could not load. Close and reopen to retry.'],
 de:['So entsteht dieses Beispiel','Gepflegter Beispielhelfer, kein Turtle-Grundbefehl. Dein Programm bleibt beim Ansehen erhalten.','Quellcode lädt…','Quellcode konnte nicht laden. Zum erneuten Versuch schließen und öffnen.'],
 ja:['この例の作り方','Turtleの基本命令ではなく、管理された例の補助関数です。表示しても自分のコードは変わりません。','ソースを読み込み中…','読み込めません。閉じて開き直してください。'],
 tr:['Bu örnek nasıl oluşturulur','Bakımı yapılan örnek yardımcısıdır, temel Turtle komutu değildir. Görüntülemek programınızı değiştirmez.','Kaynak yükleniyor…','Kaynak yüklenemedi. Tekrar denemek için kapatıp açın.'],
 hy:['Ինչպես է կառուցված օրինակը','Պահպանվող օրինակային օգնական է, ոչ Turtle հիմնական հրաման։ Դիտելը չի փոխում ձեր ծրագիրը։','Աղբյուրը բեռնվում է…','Չհաջողվեց բեռնել։ Փակեք և նորից բացեք։']
};
export default function ExampleConstruction({name,locale}){
 const [source,setSource]=useState(''),[failed,setFailed]=useState(false),[loading,setLoading]=useState(false);
 const labels=copy[locale];
 if(!['drawDino','drawPacman'].includes(name))return null;
 async function load(event){
  if(!event.currentTarget.open || source || loading)return;
  setLoading(true);setFailed(false);
  try{
   const response=await fetch(assetUrl('/engine/functions.js'));if(!response.ok)throw Error('source');
   const text=await response.text();let found='';
   parser.parse(text).iterate({enter(node){if(node.name==='FunctionDeclaration' && text.slice(node.from,node.to).startsWith(`function ${name}(`))found=text.slice(node.from,node.to);}});
   if(!found)throw Error('missing');setSource(found);
  }catch{setFailed(true);}finally{setLoading(false);}
 }
 return <details className="example-construction" onToggle={load}><summary>{labels[0]}</summary><p>{labels[1]}</p>{loading && <p role="status">{labels[2]}</p>}{failed && <p role="alert">{labels[3]}</p>}{source && <pre tabIndex={0} aria-label={`${name} source`}><code>{source}</code></pre>}</details>;
}
