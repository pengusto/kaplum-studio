// Each lesson has an observable outcome and one bounded source edit.
const content = {
 square: [
  ['Draw a closed square.','Four equal sides; the Turtle returns to its start.','Change every forward(160) to forward(100). The square gets smaller.'],
  ['Zeichne ein geschlossenes Quadrat.','Vier gleich lange Seiten; die Turtle kehrt zum Start zurück.','Ändere forward(160) zu forward(100). Das Quadrat wird kleiner.'],
  ['閉じた四角形を描こう。','同じ長さの辺が4本。Turtleは開始位置に戻ります。','forward(160)をforward(100)に変えると小さくなります。'],
  ['Kapalı bir kare çiz.','Dört eşit kenar; Turtle başlangıca döner.','forward(160) yerine forward(100) yaz. Kare küçülür.'],
  ['Նկարիր փակ քառակուսի։','Չորս հավասար կողմ․ կրիան վերադառնում է սկզբին։','forward(160)-ը փոխիր forward(100)-ի․ քառակուսին փոքրանում է։']
 ],
 'pen-journey': [
  ['Move without drawing a connecting line.','Two coral lines with an empty gap between them.','Replace penup() with pendown(). The gap becomes a line.'],
  ['Bewege die Turtle ohne Verbindungslinie.','Zwei korallfarbene Linien mit einer Lücke dazwischen.','Ersetze penup() durch pendown(). Die Lücke wird zur Linie.'],
  ['線を引かずに移動しよう。','コーラル色の線が2本、間には隙間。','penup()をpendown()にすると隙間に線ができます。'],
  ['Bağlantı çizgisi çizmeden hareket et.','Aralarında boşluk olan iki mercan çizgi.','penup() yerine pendown() yaz. Boşluk çizgi olur.'],
  ['Շարժվիր առանց կապող գծի։','Երկու մարջանագույն գիծ՝ բացով։','penup()-ը փոխարինիր pendown()-ով․ բացը դառնում է գիծ։']
 ],
 stamps: [
  ['Place stamps and remove one of them.','Four stamps remain; the middle stamp is missing.','Change clearStamp(ids[2]) to clearStamp(ids[0]). The first stamp disappears.'],
  ['Setze Stempel und entferne einen davon.','Vier Stempel bleiben; der mittlere fehlt.','Ändere clearStamp(ids[2]) zu clearStamp(ids[0]). Der erste Stempel verschwindet.'],
  ['スタンプを置いて1個消そう。','中央が消えて4個残ります。','clearStamp(ids[2])をclearStamp(ids[0])にすると最初が消えます。'],
  ['Damgaları yerleştir ve birini sil.','Dört damga kalır; ortadaki yoktur.','clearStamp(ids[2]) yerine clearStamp(ids[0]) yaz. İlk damga silinir.'],
  ['Դիր դրոշմներ և ջնջիր մեկը։','Մնում է չորս դրոշմ․ միջինը բացակայում է։','clearStamp(ids[2])-ը փոխիր clearStamp(ids[0])-ի․ առաջինը ջնջվում է։']
 ],
 circles: [
  ['Compare a Turtle path with a circle shape.','A blue semicircle path beside a coral circle.','Change circle(65,180) to circle(65,360). The path becomes a complete circle.'],
  ['Vergleiche einen Turtle-Pfad mit einer Kreisform.','Ein blauer Halbkreis-Pfad neben einem korallfarbenen Kreis.','Ändere circle(65,180) zu circle(65,360). Der Pfad wird zum ganzen Kreis.'],
  ['Turtleの経路と円の図形を比べよう。','青い半円経路の横にコーラル色の円。','circle(65,180)をcircle(65,360)にすると経路が円になります。'],
  ['Turtle yolunu daire şekliyle karşılaştır.','Mercan dairenin yanında mavi yarım daire yolu.','circle(65,180) yerine circle(65,360) yaz. Yol tam daire olur.'],
  ['Համեմատիր կրիայի ուղին և շրջանի պատկերը։','Կապույտ կիսաշրջան՝ մարջանագույն շրջանի կողքին։','circle(65,180)-ը փոխիր circle(65,360)-ի․ ուղին դառնում է ամբողջ շրջան։']
 ],
 undo: [
  ['Recover a drawing after clearing it.','The final canvas is empty. Open the tools menu and Undo once: the square and stamp return.','Remove clear() and start again. The drawing stays visible.'],
  ['Hole eine gelöschte Zeichnung zurück.','Am Ende ist die Fläche leer. Öffne das Werkzeugmenü und mache einen Schritt rückgängig: Quadrat und Stempel kommen zurück.','Entferne clear() und starte erneut. Die Zeichnung bleibt sichtbar.'],
  ['消した描画を戻そう。','最後は空白。ツールメニューで1回取り消すと四角形とスタンプが戻ります。','clear()を削除して再開すると描画が残ります。'],
  ['Silinen çizimi geri getir.','Son tuval boştur. Araç menüsünden bir kez geri al: kare ve damga döner.','clear() satırını kaldır ve yeniden başlat. Çizim kalır.'],
  ['Վերադարձրու ջնջված նկարը։','Վերջում դաշտը դատարկ է։ Գործիքների ցանկում մեկ քայլ հետարկիր․ քառակուսին ու դրոշմը վերադառնում են։','Հեռացրու clear()-ը և նորից սկսիր․ նկարը մնում է։']
 ],
 state: [
  ['Watch how moving changes the Turtle position.','Start at (35, −20); finish at (175, −20). The first 80 units leave no line.','Change forward(80) to forward(120). The final x position becomes 215.'],
  ['Beobachte, wie Bewegung die Turtle-Position verändert.','Start bei (35, −20), Ende bei (175, −20). Die ersten 80 Einheiten bleiben ohne Linie.','Ändere forward(80) zu forward(120). Die letzte x-Position wird 215.'],
  ['移動でTurtleの位置がどう変わるか見よう。','(35, −20)から(175, −20)へ。最初の80は線を引きません。','forward(80)をforward(120)にすると最後のxは215です。'],
  ['Hareketin Turtle konumunu nasıl değiştirdiğini izle.','Başlangıç (35, −20), bitiş (175, −20). İlk 80 birimde çizgi yok.','forward(80) yerine forward(120) yaz. Son x konumu 215 olur.'],
  ['Դիտիր՝ շարժումն ինչպես է փոխում կրիայի դիրքը։','Սկիզբը (35, −20), վերջը (175, −20)։ Առաջին 80 միավորը գիծ չեն թողնում։','forward(80)-ը փոխիր forward(120)-ի․ վերջնական x-ը դառնում է 215։']
 ],
 styles: [
  ['Change the colour and thickness of a line.','A thin blue line, then a thick coral line and an empty gap.','Change width(10) to width(3). The coral line becomes thinner.'],
  ['Verändere Farbe und Dicke einer Linie.','Eine dünne blaue Linie, dann eine dicke korallfarbene Linie und eine Lücke.','Ändere width(10) zu width(3). Die korallfarbene Linie wird dünner.'],
  ['線の色と太さを変えよう。','細い青線、太いコーラル線、そして隙間。','width(10)をwidth(3)にするとコーラル線が細くなります。'],
  ['Çizginin rengini ve kalınlığını değiştir.','İnce mavi çizgi, kalın mercan çizgi ve boşluk.','width(10) yerine width(3) yaz. Mercan çizgi incelir.'],
  ['Փոխիր գծի գույնն ու հաստությունը։','Բարակ կապույտ գիծ, ապա հաստ մարջանագույն գիծ և բաց։','width(10)-ը փոխիր width(3)-ի․ մարջանագույն գիծը բարակում է։']
 ],
 wrapping: [
  ['Compare movement with and without edge wrapping.','With wrapping: x = −280. Without wrapping: x = 420, outside the canvas.','Change the second wrap(false) to wrap(true). Both paths cross to the other edge.'],
  ['Vergleiche Bewegung mit und ohne Randübergang.','Mit Randübergang: x = −280. Ohne: x = 420, außerhalb der Fläche.','Ändere das zweite wrap(false) zu wrap(true). Beide Pfade wechseln zum anderen Rand.'],
  ['端の折り返しありとなしを比べよう。','ありではx = −280、なしでは画面外のx = 420。','2番目のwrap(false)をwrap(true)にすると両方とも反対側へ移動します。'],
  ['Kenar geçişi açık ve kapalı hareketi karşılaştır.','Açıkken x = −280. Kapalıyken alan dışında x = 420.','İkinci wrap(false) yerine wrap(true) yaz. İki yol da diğer kenara geçer.'],
  ['Համեմատիր շարժումը եզրանցումով և առանց դրա։','Եզրանցումով՝ x = −280։ Առանց դրա՝ դաշտից դուրս x = 420։','Երկրորդ wrap(false)-ը փոխիր wrap(true)-ի․ երկու ուղիներն էլ անցնում են մյուս եզրը։']
 ]
};
const locales=['en','de','ja','tr','hy'];
export const lessonTasks=Object.fromEntries(Object.entries(content).map(([id,rows])=>[id,Object.fromEntries(rows.map(([goal,expected,challenge],i)=>[locales[i],{goal,expected,challenge}]))]));
export const taskLabels = {
 en:['Your goal','What to look for','Try a change','Edit the code','Check these values with the original example. Your edits can change the result.'],
 de:['Dein Ziel','Darauf achtest du','Probiere eine Änderung','Code bearbeiten','Diese Werte gelten für das Originalbeispiel. Deine Änderungen können das Ergebnis verändern.'],
 ja:['目標','確認すること','変更してみよう','コードを編集','この値は元の例のものです。編集すると結果が変わります。'],
 tr:['Hedefin','Neye bakmalısın','Bir değişiklik dene','Kodu düzenle','Bu değerler ilk örnek içindir. Düzenlemeler sonucu değiştirebilir.'],
 hy:['Քո նպատակը','Ինչ դիտել','Փորձիր փոփոխություն','Խմբագրել կոդը','Այս արժեքները սկզբնական օրինակի համար են։ Փոփոխությունները կարող են փոխել արդյունքը։']
};
