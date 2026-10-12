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
const steps={
 en:{drawDino:['Anchor: the body is centered at the current Turtle position. Dino stays upright; Turtle heading does not rotate it.','Build: an ellipse forms the body, a circle the head; lines form neck, tail and legs. size scales their offsets and widths together.','Try: paintColor colors the body; legAngle spreads the legs, clamped to −45°…45°. Legs stay dark green and the eye black.'],drawPacman:['Anchor: the current Turtle position is the center. radius sets the distance from center to edge.','Build: 40 line segments trace a circular outline; closing the path to the center leaves the mouth opening. paintColor fills it.','Try: mouth changes the opening, clamped to 10°…160°. direction rotates the shape; when omitted it uses the Turtle heading (0° points up).']},
 de:{drawDino:['Anker: Der Körper liegt an der aktuellen Turtle-Position. Der Dino bleibt aufrecht; die Turtle-Richtung dreht ihn nicht.','Aufbau: Eine Ellipse bildet den Körper, ein Kreis den Kopf; Linien bilden Hals, Schwanz und Beine. size skaliert Abstände und Breiten gemeinsam.','Ausprobieren: paintColor färbt den Körper; legAngle spreizt die Beine, begrenzt auf −45°…45°. Beine bleiben dunkelgrün, das Auge schwarz.'],drawPacman:['Anker: Die aktuelle Turtle-Position ist der Mittelpunkt. radius bestimmt den Abstand zur Außenkante.','Aufbau: 40 Linienabschnitte bilden den Kreisrand; der geschlossene Weg zum Mittelpunkt lässt die Mundöffnung frei. paintColor füllt die Figur.','Ausprobieren: mouth verändert die Öffnung, begrenzt auf 10°…160°. direction dreht die Figur; ohne diesen Wert gilt die Turtle-Richtung (0° zeigt nach oben).']},
 ja:{drawDino:['基準点：体の中心は現在のTurtle位置です。恐竜は上向きのままで、Turtleの方向では回転しません。','構成：楕円が体、円が頭、線が首・尾・脚です。sizeは距離と線幅をまとめて拡大します。','試す：paintColorは体の色、legAngleは脚の開き（−45°～45°）です。脚は濃い緑、目は黒です。'],drawPacman:['基準点：現在のTurtle位置が中心です。radiusは中心から輪郭までの距離です。','構成：40本の線分で円周を描き、中心へ閉じると口の開きが残ります。paintColorで塗ります。','試す：mouthは口の開き（10°～160°）、directionは回転です。省略するとTurtleの方向を使います（0°は上）。']},
 tr:{drawDino:['Referans: gövde mevcut Turtle konumunda ortalanır. Dino dik kalır; Turtle yönü onu döndürmez.','Yapı: elips gövdeyi, daire başı; çizgiler boyun, kuyruk ve bacakları oluşturur. size uzaklıkları ve kalınlıkları birlikte ölçekler.','Dene: paintColor gövdeyi boyar; legAngle bacakları açar ve −45°…45° aralığına sınırlanır. Bacaklar koyu yeşil, göz siyahtır.'],drawPacman:['Referans: mevcut Turtle konumu merkezdir. radius merkezden kenara uzaklığı belirler.','Yapı: 40 çizgi parçası dairesel kenarı çizer; yolu merkeze kapatmak ağız açıklığını bırakır. paintColor şekli doldurur.','Dene: mouth açıklığı değiştirir (10°…160°). direction şekli döndürür; verilmezse Turtle yönü kullanılır (0° yukarıdır).']},
 hy:{drawDino:['Հենակետ․ մարմնի կենտրոնը Turtle-ի ընթացիկ դիրքն է։ Դինոզավրը մնում է ուղղահայաց․ Turtle-ի ուղղությունը չի պտտում նրան։','Կառուցում․ էլիպսը մարմինն է, շրջանը՝ գլուխը, գծերը՝ պարանոցը, պոչը և ոտքերը։ size-ը միասին փոխում է հեռավորություններն ու հաստությունները։','Փորձեք․ paintColor-ը մարմնի գույնն է, legAngle-ը բացում է ոտքերը՝ −45°…45° սահմաններում։ Ոտքերը մուգ կանաչ են, աչքը՝ սև։'],drawPacman:['Հենակետ․ Turtle-ի ընթացիկ դիրքը կենտրոնն է։ radius-ը կենտրոնից եզր հեռավորությունն է։','Կառուցում․ 40 գծահատված գծում է շրջանաձև եզրը։ Ճանապարհը կենտրոնին միացնելիս մնում է բերանի բացվածքը։ paintColor-ը լցնում է պատկերը։','Փորձեք․ mouth-ը փոխում է բացվածքը՝ 10°…160° սահմաններում։ direction-ը պտտում է պատկերը․ բացակայության դեպքում օգտագործվում է Turtle-ի ուղղությունը (0°՝ վերև)։']}
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
 return <details className="example-construction" onToggle={load}><summary>{labels[0]}</summary><p>{labels[1]}</p><ol>{steps[locale][name].map(step=><li key={step}>{step}</li>)}</ol>{loading && <p role="status">{labels[2]}</p>}{failed && <p role="alert">{labels[3]}</p>}{source && <pre tabIndex={0} aria-label={`${name} source`}><code>{source}</code></pre>}</details>;
}
