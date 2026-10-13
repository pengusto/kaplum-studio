const rows={
 en:["Code debugger · prototype","Start code debugger","Next code statement","Continue code","Pause code","Line","Variables","Finished","Paused before this statement. Next executes it; Continue runs until paused or finished. Supports let/const, direct teaching calls and braced for/while/if. Named functions with plain parameters and return values are stepped into. Timers and property access are unsupported. Helper calls run as one statement; values are primitives only."],
 de:["Code-Debugger · Prototyp","Code-Debugger starten","Nächste Code-Anweisung","Code fortsetzen","Code pausieren","Zeile","Variablen","Fertig","Pause vor dieser Anweisung. Weiter führt sie aus; Fortsetzen läuft bis Pause oder Ende. Unterstützt let/const, direkte Lehrbefehle und for/while/if mit Klammern. Benannte Funktionen mit einfachen Parametern und Rückgabewerten werden schrittweise ausgeführt. Timer und Eigenschaftszugriffe fehlen. Helfer laufen als eine Anweisung; nur einfache Werte werden angezeigt."],
 ja:["コードデバッガー · 試作","コードデバッガーを開始","次の文","コードを続行","コードを一時停止","行","変数","完了","この文の前で停止。次へで実行。let/const、直接の描画呼び出し、波括弧付きfor/while/ifを対応。名前付き関数、引数、戻り値をステップ実行。タイマーとプロパティアクセスは未対応。補助関数は一つの文。単純な値のみ表示。"],
 tr:["Kod hata ayıklayıcı · prototip","Kod hata ayıklayıcıyı başlat","Sonraki kod ifadesi","Koda devam et","Kodu duraklat","Satır","Değişkenler","Bitti","Bu ifadeden önce durakladı. Sonraki çalıştırır. let/const, doğrudan çizim çağrıları ve süslü parantezli for/while/if desteklenir. Adlandırılmış işlevler, basit parametreler ve dönüş değerleri adım adım çalışır. Zamanlayıcı ve özellik erişimi desteklenmez. Yardımcı tek ifade olarak çalışır; yalnız basit değerler gösterilir."],
 hy:["Կոդի վրիպազերծիչ · նախատիպ","Սկսել կոդի վրիպազերծումը","Հաջորդ հրահանգը","Շարունակել կոդը","Դադարեցնել կոդը","Տող","Փոփոխականներ","Ավարտված","Դադար այս հրահանգից առաջ։ Հաջորդը կատարում է այն։ Աջակցվում են let/const, նկարման կանչերը և փակագծերով for/while/if։ Անվանված ֆունկցիաները, պարզ պարամետրերն ու վերադարձի արժեքները կատարվում են քայլերով։ Ժամանակաչափերն ու հատկությունները չեն աջակցվում։ Օգնականը մեկ հրահանգ է․ միայն պարզ արժեքներ։"]
};
export const debuggerCopy=Object.fromEntries(Object.entries(rows).map(([locale,values])=>[locale,Object.fromEntries(["title","start","next","continue","pause","line","variables","finished","help"].map((key,i)=>[key,values[i]]))]));

const breakpointRows={
 en:["Breakpoints","Breakpoint line","Set breakpoint","Remove breakpoint","Clear breakpoints","Paused at breakpoint","Select an executable line. Continue stops before its next checkpoint; Next executes it. Breakpoints survive Restart and clear when code changes.","Choose a line with a supported statement (maximum 100 breakpoints)."],
 de:["Haltepunkte","Zeile für Haltepunkt","Haltepunkt setzen","Haltepunkt entfernen","Haltepunkte löschen","Am Haltepunkt pausiert","Wähle eine ausführbare Zeile. Fortsetzen hält vor ihrem nächsten Schritt; Weiter führt ihn aus. Haltepunkte bleiben beim Neustart und werden bei Codeänderungen gelöscht.","Wähle eine Zeile mit unterstützter Anweisung (höchstens 100 Haltepunkte)."],
 ja:["ブレークポイント","停止する行","停止点を設定","停止点を削除","すべて削除","停止点で一時停止","実行できる行を選ぶ。続行は次のチェックポイントの前で停止。次へで実行。再起動で保持し、編集で削除。","対応する文の行を選択してください（最大100件）。"],
 tr:["Kesme noktaları","Kesme noktası satırı","Kesme noktası ekle","Kesme noktasını kaldır","Kesme noktalarını temizle","Kesme noktasında durakladı","Çalıştırılabilir bir satır seç. Devam sonraki noktadan önce durur; Sonraki çalıştırır. Yeniden başlatmada korunur, kod düzenlenince silinir.","Desteklenen bir ifadenin satırını seç (en fazla 100 nokta)."],
 hy:["Կանգառի կետեր","Կանգառի տողը","Ավելացնել կանգառ","Հեռացնել կանգառը","Ջնջել կանգառները","Դադար կանգառի կետում","Ընտրեք կատարվող տողը։ Շարունակելը կանգնում է հաջորդ կետից առաջ, Հաջորդը կատարում է այն։ Վերագործարկման դեպքում կետերը մնում են, խմբագրման դեպքում՝ ջնջվում։","Ընտրեք աջակցվող հրահանգի տողը (առավելագույնը 100 կետ)։"]
};
for(const [locale,values] of Object.entries(breakpointRows)) Object.assign(debuggerCopy[locale],Object.fromEntries(["breakpoints","breakpointLine","addBreakpoint","removeBreakpoint","clearBreakpoints","breakpointHit","breakpointHelp","breakpointError"].map((key,i)=>[key,values[i]])));

const interfaceRows={
 en:["Debug code","Next step","Continue","Pause","The highlighted statement runs when you press Next step.","Supported code"],
 de:["Code untersuchen","Nächster Schritt","Fortsetzen","Pause","Nächster Schritt führt die markierte Anweisung aus.","Unterstützter Code"],
 ja:["コードを調べる","次のステップ","続行","一時停止","次のステップで強調表示された文を実行します。","対応するコード"],
 tr:["Kodu incele","Sonraki adım","Devam","Duraklat","Sonraki adım vurgulanan ifadeyi çalıştırır.","Desteklenen kod"],
 hy:["Ուսումնասիրել կոդը","Հաջորդ քայլը","Շարունակել","Դադար","Հաջորդ քայլը կատարում է նշված հրահանգը։","Աջակցվող կոդ"]
};
for(const [locale,values] of Object.entries(interfaceRows)) Object.assign(debuggerCopy[locale],Object.fromEntries(["startShort","nextShort","continueShort","pauseShort","stepHint","limits"].map((key,i)=>[key,values[i]])));

const stepRows={
 en:["Up next","Recent steps","Statement","Check control flow","Enter loop body","No instruction has run yet. Press Next step.","Showing the latest 8 checkpoints. Helper calls run as one step."],
 de:["Als Nächstes","Letzte Schritte","Anweisung","Ablauf prüfen","In den Schleifenkörper","Noch nichts ausgeführt. Drücke Nächster Schritt.","Die letzten 8 Haltestellen. Ein Helferaufruf läuft als ein Schritt."],
 ja:["次に実行","最近のステップ","文","制御を確認","ループ本体へ","まだ実行されていません。次のステップを押してください。","最新8件を表示。補助関数は1ステップとして実行。"],
 tr:["Sıradaki","Son adımlar","İfade","Akışı kontrol et","Döngü gövdesine gir","Henüz çalışmadı. Sonraki adıma bas.","Son 8 kontrol noktası. Yardımcı çağrılar tek adımda çalışır."],
 hy:["Հաջորդը","Վերջին քայլերը","Հրահանգ","Ստուգել ընթացքը","Մտնել ցիկլի մարմին","Դեռ ոչինչ չի կատարվել։ Սեղմեք Հաջորդ քայլը։","Վերջին 8 կետերը։ Օգնական կանչը մեկ քայլ է։"]
};
for(const [locale,values] of Object.entries(stepRows)) Object.assign(debuggerCopy[locale],Object.fromEntries(["upNext","recent","statement","control","body","initialStep","historyHelp"].map((key,i)=>[key,values[i]])));

const conditionRows={
 en:["Check result","True — enter this branch.","False — skip this branch; use else if present.","True — run another loop iteration.","False — leave the loop."],
 de:["Prüfung","Wahr — dieser Zweig wird ausgeführt.","Falsch — diesen Zweig überspringen; falls vorhanden geht es mit else weiter.","Wahr — die Schleife läuft noch einmal.","Falsch — die Schleife endet."],
 ja:["条件の結果","真 — この分岐を実行します。","偽 — この分岐を飛ばし、elseがあれば進みます。","真 — ループをもう一度実行します。","偽 — ループを終了します。"],
 tr:["Koşul sonucu","Doğru — bu dalı çalıştır.","Yanlış — bu dalı atla; varsa else ile devam et.","Doğru — döngüyü bir kez daha çalıştır.","Yanlış — döngüden çık."],
 hy:["Ստուգման արդյունք","Ճիշտ — կատարել այս ճյուղը։","Սխալ — բաց թողնել այս ճյուղը, շարունակել else-ով, եթե կա։","Ճիշտ — կատարել ցիկլի ևս մեկ քայլ։","Սխալ — ավարտել ցիկլը։"]
};
for(const [locale,values] of Object.entries(conditionRows)) Object.assign(debuggerCopy[locale],Object.fromEntries(["condition","ifTrue","ifFalse","loopTrue","loopFalse"].map((key,i)=>[key,values[i]])));
export function conditionExplanation(condition,locale) {return debuggerCopy[locale][`${condition.control}${condition.result ? "True" : "False"}`];}

const functionRows={
 en:["Enter function","Return from function","Active calls","main.js"],
 de:["In die Funktion","Aus der Funktion zurück","Aktive Aufrufe","main.js"],
 ja:["関数に入る","関数から戻る","実行中の呼び出し","main.js"],
 tr:["İşleve gir","İşlevden dön","Etkin çağrılar","main.js"],
 hy:["Մտնել ֆունկցիա","Վերադառնալ ֆունկցիայից","Ակտիվ կանչեր","main.js"]
};
for(const [locale,values] of Object.entries(functionRows)) Object.assign(debuggerCopy[locale],Object.fromEntries(["function","return","calls","main"].map((key,i)=>[key,values[i]])));

const functionHints={
 en:["Function entered. Its parameters are ready; Next goes to the first body instruction.","Next evaluates the return value and continues in the caller."],
 de:["Funktion betreten. Ihre Parameter sind bereit; Nächster Schritt geht zur ersten Anweisung im Körper.","Nächster Schritt berechnet den Rückgabewert und geht zum Aufrufer zurück."],
 ja:["関数に入りました。引数は設定済み。次のステップで最初の文へ進みます。","次のステップで戻り値を計算し、呼び出し元に戻ります。"],
 tr:["İşleve girildi. Parametreler hazır; sonraki adım ilk ifadeye gider.","Sonraki adım dönüş değerini hesaplar ve çağırana döner."],
 hy:["Ֆունկցիան սկսված է։ Պարամետրերը պատրաստ են․ հաջորդ քայլը անցնում է առաջին հրահանգին։","Հաջորդ քայլը հաշվարկում է վերադարձի արժեքը և վերադառնում կանչողին։"]
};
for(const [locale,values] of Object.entries(functionHints)) Object.assign(debuggerCopy[locale],{functionHint:values[0],returnHint:values[1]});
