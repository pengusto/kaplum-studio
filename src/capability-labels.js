export const capabilityLabels = {
 en: {all:"All", turtle:"Turtle commands", drawing:"Drawing helpers", example:"Example figures", state:"Turtle state", grid:"Coordinate grid", pen:"Pen down", pointer:"Pointer", copy:"Copy position", focus:"Focus the canvas to use keys."},
 de: {all:"Alle", turtle:"Turtle-Befehle", drawing:"Zeichenhelfer", example:"Beispiel-Figuren", state:"Turtle-Zustand", grid:"Koordinatenraster", pen:"Stift unten", pointer:"Mausposition", copy:"Position kopieren", focus:"Zeichenfläche fokussieren, um Tasten zu verwenden."},
 ja: {all:"すべて", turtle:"タートル命令", drawing:"描画ヘルパー", example:"図形の例", state:"タートルの状態", grid:"座標グリッド", pen:"ペンを下ろす", pointer:"ポインター", copy:"位置をコピー", focus:"キー操作には描画領域を選択してください。"},
 tr: {all:"Tümü", turtle:"Turtle komutları", drawing:"Çizim yardımcıları", example:"Örnek şekiller", state:"Turtle durumu", grid:"Koordinat ızgarası", pen:"Kalem aşağıda", pointer:"İşaretçi", copy:"Konumu kopyala", focus:"Tuşlar için çizim alanını odaklayın."},
 hy: {all:"Բոլորը", turtle:"Turtle հրամաններ", drawing:"Նկարման օգնականներ", example:"Օրինակ պատկերներ", state:"Turtle վիճակ", grid:"Կոորդինատային ցանց", pen:"Գրիչն իջեցված է", pointer:"Ցուցիչ", copy:"Պատճենել դիրքը", focus:"Ստեղների համար ընտրեք նկարման դաշտը։"}
};

const playbackCopy = {
 en: ["Record drawing", "Drawing playback", "Play", "Pause", "Next drawing step", "Previous drawing step", "Reset playback", "Milliseconds per step", "Finite drawings only. Timers and input need normal Run. This steps drawing operations, not JavaScript lines."],
 de: ["Zeichnung aufzeichnen", "Zeichnung abspielen", "Abspielen", "Pause", "Nächster Zeichenschritt", "Vorheriger Zeichenschritt", "Wiedergabe zurücksetzen", "Millisekunden pro Schritt", "Nur endliche Zeichnungen. Timer und Eingaben brauchen normales Starten. Schritte zeigen Zeichenoperationen, keine JavaScript-Zeilen."],
 ja: ["描画を記録", "描画の再生", "再生", "一時停止", "次の描画ステップ", "前の描画ステップ", "再生をリセット", "ステップのミリ秒", "有限の描画のみ。タイマーと入力には通常実行を使います。JavaScriptの行ではなく描画操作です。"],
 tr: ["Çizimi kaydet", "Çizim oynatma", "Oynat", "Duraklat", "Sonraki çizim adımı", "Önceki çizim adımı", "Oynatmayı sıfırla", "Adım başına milisaniye", "Yalnızca sonlu çizimler. Zamanlayıcı ve giriş için normal çalıştırmayı kullanın. JavaScript satırları değil çizim işlemleri adımlanır."],
 hy: ["Գրանցել նկարը", "Նկարի նվագարկում", "Նվագարկել", "Դադար", "Հաջորդ նկարման քայլ", "Նախորդ նկարման քայլ", "Վերակայել նվագարկումը", "Քայլի միլիվայրկյաններ", "Միայն վերջավոր նկարներ։ Ժամանակաչափերի և մուտքի համար սովորական մեկնարկ։ Քայլերը նկարման գործողություններ են, ոչ JavaScript տողեր։"]
};
for (const [locale, values] of Object.entries(playbackCopy)) Object.assign(capabilityLabels[locale], Object.fromEntries(["record","playback","play","pause","next","back","resetReplay","delay","replayHelp"].map((key,i)=>[key,values[i]])));

const undoLabels = {en:"Undo drawing step",de:"Zeichenschritt rückgängig",ja:"描画ステップを取り消す",tr:"Çizim adımını geri al",hy:"Հետարկել նկարման քայլը"};
for (const [locale, undo] of Object.entries(undoLabels)) capabilityLabels[locale].undo = undo;

const finishLabels={en:"Show final drawing",de:"Fertige Zeichnung zeigen",ja:"完成した描画を表示",tr:"Son çizimi göster",hy:"Ցույց տալ ավարտված նկարը"};
for(const [locale,finish] of Object.entries(finishLabels))capabilityLabels[locale].finish=finish;
