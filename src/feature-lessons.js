// Finite programs share the existing workspace, draft and export contracts.
const rows = [
 ['square','forward','color("DeepSkyBlue"); width(4); goto(-80,-80); for(let i=0;i<4;i++){forward(160);right(90);}',
  ['Square replay','Quadrat abspielen','四角形を再生','Kareyi oynat','Քառակուսու նվագարկում'],
  ['Record, play, pause and advance one drawing step. Expect a closed square and the starting position.','Aufzeichnen, abspielen, pausieren und einen Zeichenschritt weitergehen. Ergebnis: geschlossenes Quadrat und Startposition.','記録、再生、一時停止、1ステップ進める。閉じた四角形と開始位置を確認。','Kaydet, oynat, duraklat ve bir adım ilerle. Kapalı kare ve başlangıç konumu beklenir.','Գրանցեք, նվագարկեք, դադարեցրեք և անցեք մեկ քայլ։ Արդյունքը՝ փակ քառակուսի և սկզբնական դիրք։']],
 ['pen-journey','penup','color("coral"); width(5); goto(-160,-60); forward(120); penup(); right(90); forward(160); pendown(); right(90); forward(120);',
  ['Pen-up journey','Reise mit gehobenem Stift','ペンを上げた移動','Kalem yukarı yolculuk','Ճամփորդություն բարձրացված գրիչով'],
  ['Record and watch the gap: two vertical lines, no connecting horizontal line.','Aufzeichnen und die Lücke beobachten: zwei senkrechte Linien ohne waagerechte Verbindung.','記録して隙間を見る。縦線2本、横の接続線なし。','Kaydet ve boşluğu izle: iki dikey çizgi, yatay bağlantı yok.','Գրանցեք և դիտեք բացը՝ երկու ուղղահայաց գիծ, առանց հորիզոնական կապի։']],
 ['stamps','stamp','hideTurtle(); penup(); const ids=[]; for(let i=0;i<5;i++){goto(-160+i*80,0);angle(i*30);color(i%2 ? "coral" : "DeepSkyBlue");ids.push(stamp());} clearStamp(ids[2]);',
  ['Removable stamp pattern','Löschbares Stempelmuster','消せるスタンプ模様','Silinebilir damga deseni','Ջնջվող դրոշմների նախշ'],
  ['Run or record five coloured, rotated stamps. Expect four: the middle impression is removed. Export and repeat offline.','Fünf farbige, gedrehte Stempel starten oder aufzeichnen. Vier bleiben: der mittlere ist gelöscht. Exportieren und offline testen.','色と向きの違うスタンプ5個を実行か記録。中央を消して4個残る。書き出してオフラインでも試す。','Beş renkli, döndürülmüş damgayı çalıştır veya kaydet. Ortadaki silinir, dört kalır. Dışa aktar ve çevrimdışı dene.','Գործարկեք կամ գրանցեք հինգ գունավոր պտտված դրոշմ։ Միջինը ջնջվում է, մնում է չորսը։ Արտահանեք և փորձեք անցանց։']],
 ['circles','circle','wrap(false); color("DeepSkyBlue"); width(4); goto(-80,0); circle(65,180); penup(); goto(110,0); pendown(); drawCircle(65,"coral",false);',
  ['Path versus shape','Pfad oder Form','経路と図形','Yol ve şekil','Ուղի և պատկեր'],
  ['Compare a moving half-circle path with the static circle helper. Change extent to 360 or radius to -65; inspect the position and heading.','Bewegten Halbkreis-Pfad mit statischem Kreishelfer vergleichen. Winkel auf 360 oder Radius auf -65 ändern; Position und Richtung beobachten.','移動する半円経路と静的な円を比較。角度を360、半径を-65に変え、位置と向きを見る。','Hareketli yarım daire yolunu sabit daireyle karşılaştır. Açıyı 360 veya yarıçapı -65 yap; konum ve yönü incele.','Համեմատեք շարժվող կիսաշրջանի ուղին և անշարժ շրջանը։ Անկյունը դարձրեք 360 կամ շառավիղը՝ -65, դիտեք դիրքն ու ուղղությունը։']],
 ['undo','undo','hideTurtle(); color("coral"); goto(-80,-80); beginFill("gold"); for(let i=0;i<4;i++){forward(160);right(90);} endFill(); stamp(); clear();',
  ['Undo clear','Löschen rückgängig','消去を取り消す','Silme işlemini geri al','Հետարկել ջնջումը'],
  ['Record, show the final blank drawing, then Undo once. The filled square and stamp return; editor text stays unchanged.','Aufzeichnen, fertige leere Zeichnung zeigen, einmal Rückgängig. Gefülltes Quadrat und Stempel kommen zurück; Editor-Text bleibt erhalten.','記録し、最後の空の描画を表示して取り消す。塗った四角形とスタンプが戻り、コードは変わらない。','Kaydet, son boş çizimi göster, bir kez geri al. Dolu kare ve damga geri gelir; editör değişmez.','Գրանցեք, ցույց տվեք վերջնական դատարկ նկարը և մեկ անգամ հետարկեք։ Լցված քառակուսին և դրոշմը վերադառնում են, կոդը չի փոխվում։']]
];
const languages=['en','de','ja','tr','hy'];
export const featureLessons=rows.map(([id,command,code,titles,tasks])=>({id,command,code,title:Object.fromEntries(languages.map((l,i)=>[l,titles[i]])),task:Object.fromEntries(languages.map((l,i)=>[l,tasks[i]]))}));
export const lessonCopy={
 en:['New functions — test lab','General Turtle commands. These finite programs can be edited, reset and exported; they are separate from Dino/Pacman example helpers.','Open and edit','Back to test lab'],
 de:['Neue Funktionen — Testlabor','Allgemeine Turtle-Befehle. Diese endlichen Programme lassen sich bearbeiten, zurücksetzen und exportieren; getrennt von Dino/Pacman-Beispielhelfern.','Öffnen und bearbeiten','Zurück zum Testlabor'],
 ja:['新機能 — テストラボ','基本Turtle命令。有限のプログラムを編集、リセット、書き出せます。Dino/Pacmanの例とは別です。','開いて編集','テストラボに戻る'],
 tr:['Yeni işlevler — test laboratuvarı','Genel Turtle komutları. Sonlu programlar düzenlenebilir, sıfırlanabilir ve dışa aktarılabilir; Dino/Pacman örneklerinden ayrıdır.','Aç ve düzenle','Test laboratuvarına dön'],
 hy:['Նոր գործառույթներ — փորձարկման լաբորատորիա','Ընդհանուր Turtle հրամաններ։ Վերջավոր ծրագրերը կարելի է խմբագրել, վերակայել և արտահանել։ Առանձին են Dino/Pacman օրինակներից։','Բացել և խմբագրել','Վերադառնալ լաբորատորիա']
};
